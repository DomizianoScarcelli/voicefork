from zipfile import ZipFile
import pandas as pd
import numpy as np
import json
import math

restaurant_file_path = "../italian_restaurants.zip"
cuisine_file_path = "./json/cuisine_categories.json"
save_df_path = "../restaurants_macro_cuisines.csv"

def read_resturants(path):
    zip_file = ZipFile(path)
    csv_file = zip_file.namelist()[0]
    return pd.read_csv(zip_file.open(csv_file))

def extract_unique_cuisines(path):
    df = read_resturants(path)
    df['cuisines'] = df['cuisines'].dropna().apply(lambda x: x.split(','))
    df['unique_cuisines'] = df['cuisines'].apply(lambda x: np.unique(x))
    distinct_cuisines = [x.strip() for x in df.explode('cuisines')['cuisines'].dropna().unique()]
    print(set(distinct_cuisines))

def read_cuisine_json(path):
    all_cuisines = {}
    with open(path, 'r') as file:
        all_cuisines = json.loads(file.read())
    return all_cuisines

all_cuisines = read_cuisine_json(cuisine_file_path)

def extract_macro_cuisines(cuisine_list):
    aggregated_list = []
    if cuisine_list is np.nan: return 
    for cuisine in cuisine_list.split(","):
        if cuisine.strip() in all_cuisines:
            macro_cuisine = all_cuisines[cuisine.strip()]
            if macro_cuisine not in aggregated_list:
                aggregated_list.append(macro_cuisine)
    return aggregated_list

def add_macro_cuisines(restaurants_path, save_path):
    df = read_resturants(restaurants_path)
    df['macro_cuisines'] = df['cuisines'].apply(extract_macro_cuisines)
    print(df)
    df.to_csv(save_path, index=False)

#extract_unique_cuisines(restaurant_file_path)
add_macro_cuisines(restaurant_file_path, save_df_path)