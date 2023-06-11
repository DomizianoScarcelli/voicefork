import requests
from tqdm import tqdm

BASE = "http://proxy-load-balancer-1111988496.us-east-1.elb.amazonaws.com"
URL = f'{BASE}/restaurants/delete-restaurant/'

for i in tqdm(range(1, 1485)):
    requests.delete(URL + str(i))
