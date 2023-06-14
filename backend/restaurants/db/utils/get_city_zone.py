import json
import pandas as pd
import requests
from typing import Dict
from tqdm import tqdm
import time
from retrying import retry
import os
import math


def http_error_retry(wait_seconds):
    def decorator(func):
        @retry(stop_max_attempt_number=3, wait_fixed=wait_seconds*1000)
        def wrapper(*args, **kwargs):
            try:
                result = func(*args, **kwargs)
                return result
            except requests.exceptions.RequestException as e:
                print(f"HTTP error occurred: {e}")
                print(f"Retrying in {wait_seconds} seconds...")
                time.sleep(wait_seconds)
                raise e
        return wrapper
    return decorator


CSV_PATH = "../restaurants_macro_cuisines.csv"


def check_field(field: str, address: Dict) -> bool:
    return field in address and "Municipio" not in address[field]


@http_error_retry(wait_seconds=15)
def getGeoZoneFromLatLng(latitude, longitude):
    URL = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={latitude}&lon={longitude}"

    response = requests.get(URL)
    data = response.json()
    try:
        address = data['address']
    except:
        #LatLng are not defined for the restaurant        
        return ""

    if check_field("quarter", address):
        return address['quarter']
    if check_field("highway", address):
        return address['highway']
    if check_field("village", address):
        return address['village']
    if check_field("neighbourhood", address):
        return address['neighbourhood']
    if check_field("town", address):
        return address['town']
    if check_field("hamlet", address):
        return address['hamlet']
    if check_field("railway", address):
        return address['railway']
    if check_field("suburb", address):
        return address['suburb']
    if check_field("road", address):
        return address['road']
    else:
        return ''


def checkpoint(df: pd.DataFrame, index: int) -> None:
    CHECKPOINT_PATH = f"../checkpoints/zone_checkpoint-{index}"
    df.to_csv(CHECKPOINT_PATH)

def last_checkpoint() -> int:
    max_index = int(max([file.split("-")[-1] for file in os.listdir("../checkpoints/")]))
    return max_index

def main():
    CHECKPOINT_DELTA = 1_000
    df = pd.read_csv(CSV_PATH)
    df['zone'] = ''
    for index, row in tqdm(df.iterrows(), desc="Extracting city zone...", total=len(df)):
        if index <= last_checkpoint(): continue
        # Checkpointing
        if index != 0 and index % CHECKPOINT_DELTA == 0:
            checkpoint(df, index)

        latitude, longitude = row["latitude"], row["longitude"]
        zone = getGeoZoneFromLatLng(latitude, longitude)
        df.at[index, 'zone'] = zone
    FINAL_DF_PATH = "./restaurants_zone.csv"
    df.to_csv(FINAL_DF_PATH)


if __name__ == "__main__":
    main()
