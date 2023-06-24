import pandas as pd
import requests
from tqdm import tqdm
from get_city_zone import http_error_retry

CSV_PATH = "../restaurant_zone_w_cities_parsed.csv"
FINAL_DF_PATH = "./restaurants_zone_w_cities_and_cuisines.csv"


@http_error_retry(wait_seconds=15)
def getCityFromLatLng(latitude, longitude):
    URL = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={latitude}&lon={longitude}"

    response = requests.get(URL)
    data = response.json()
    try:
        address = data['address']
    except:
        # LatLng are not defined for the restaurant
        return ""
    if "city" in address:
        return address["city"]
    return ""


def main():
    CHECK = "./checkpoints/check_2200.csv"
    df = pd.read_csv(CHECK)
    count = 1
    for index, row in tqdm(df.iterrows(), desc="Populating cities...", total=len(df)):
        if df.at[index, 'city'] == "ome":
            print("ome to Rome")
            df.at[index, 'city'] = "Rome"

        if pd.isna(df.at[index, 'city']):
            latitude, longitude = row["latitude"], row["longitude"]
            city = getCityFromLatLng(latitude, longitude)
            df.at[index, 'city'] = city
            count += 1

            if count % 300 == 0:
                CHECKPOINT_PATH = f"./checkpoints/check_{count}.csv"
                df.to_csv(CHECKPOINT_PATH)
                print(f"Saved, updated {count} cities")

    df.to_csv(FINAL_DF_PATH)
    check_cities()


def fix_rome():
    INPUT_CSV = "../restaurants_parsed.csv"
    df = pd.read_csv(INPUT_CSV)
    df = df.fillna("")
    for index, row in tqdm(df.iterrows(), desc="Populating cities...", total=len(df)):
        curr_city = df.at[index, 'city']
        if curr_city.lower() == "rome" or curr_city.lower() == "roma":
            print("fixed!")
            df.at[index, 'city'] = "rome"
        if curr_city == "ome":
            print("fixed!")
            df.at[index, 'city'] = "rome"
    SAVED_DF = "./restaurants_parsed_fixed.csv"
    df.to_csv(SAVED_DF)


def check_cities():
    INPUT_CSV = "../restaurants_parsed_2.csv"
    df = pd.read_csv(INPUT_CSV)
    print(len([item for item in df["city"].isna() if item == True]))
    print(len([item for item in df["city"] if item == ""]))


if __name__ == "__main__":
    fix_rome()
