from fastapi import FastAPI
from .services.MinioService import MinioService
from .services.ModelService import ModelService
import logging
from Levenshtein import ratio
import redis
from .utils.distance_utils import compute_distance
from .items.restaurants import RestaurantWithDistance
from typing import List

logging.basicConfig(level=logging.DEBUG)  # Set log level to DEBUG
logger = logging.getLogger(__name__)

app = FastAPI()
model = ModelService()
minio = MinioService()

# TODO: remove old results from the cache otherwise it will saturate the memory
query_cache = {}

# TODO: change localhost for aws
redis_client = redis.Redis(host='redis', port=6379, decode_responses=True)


@app.on_event("startup")
async def startup_event():
    logger.info("Loading model")
    model.load_model()
    logger.info("Finished loading model!")


@app.get("/")
def welcome():
    return {"message": f"Welcome to the Embedding service!"}


@app.get("/distance-query")
def distance_query(query_name: str, other_name: str, embedding_name: str):
    distance = compute_distance(query_name=query_name,
                                other_name=other_name,
                                embedding_name=embedding_name,
                                query_cache=query_cache,
                                model=model,
                                redis_client=redis_client,
                                minio=minio)
    return {"distance": distance}


@app.get("/batch-distance-query")
def batch_distance_query(query_name: str, restaurant_list: List[RestaurantWithDistance]):
    result = []
    for item in restaurant_list:
        restaurant = item.restaurant
        distance = compute_distance(query_name=query_name,
                                    other_name=restaurant.name,
                                    embedding_name=restaurant.embeddingName,
                                    query_cache=query_cache,
                                    model=model,
                                    redis_client=redis_client,
                                    minio=minio)
        result.append({"restaurant": restaurant,
                      "locationDistance": item.distance, "nameDistance": distance})
    return result
