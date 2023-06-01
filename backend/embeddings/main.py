from fastapi import FastAPI
from .services.MinioService import MinioService
from .services.ModelService import ModelService
import logging
from Levenshtein import ratio
import redis
from .utils.distance_utils import compute_distance, compute_distance_fais_with_removable_words
from .items.restaurants import RestaurantSearchQuery
from typing import List, Union
from .services.FaissService import FaissService
import os
logging.basicConfig(level=logging.INFO)
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

app = FastAPI()
model = ModelService()
minio = MinioService()

# TODO: remove old results from the cache otherwise it will saturate the memory
query_cache = {}

host = "redis" if os.environ["USE_MINIO_LOCAL"] == "true" else "localhost"
redis_client = redis.Redis(host=host, port=6379, decode_responses=True)

faiss_service = FaissService()


@app.on_event("startup")
async def startup_event():
    logger.info(f"The host is: {host}")
    logger.info("Loading model")
    model.load_model()
    logger.info("Finished loading model!")
    logger.info("Building faiss index")
    faiss_service = FaissService()
    faiss_service.initialize_embeddings()
    logger.info("Finished building faiss index")


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


@app.get("/faiss-distance-query")
def faiss_distance_query(query_name: str, limit: Union[int, None] = None):
    indexes = compute_distance_fais_with_removable_words(query_name=query_name,
                                                         redis_client=redis_client,
                                                         model=model,
                                                         k=limit)

    embedding_names = {
        index: faiss_service.index_lookup[f"{index}"] for index in indexes.keys()}

    results = []
    for index, distance in indexes.items():
        result = {"embeddingName": embedding_names[index],
                  "nameDistance": distance}
        results.append(result)
    return results


@app.get("/batch-distance-query")
def batch_distance_query(query_name: str, restaurant_list: List[RestaurantSearchQuery]):
    result = []
    for item in restaurant_list:
        distance = compute_distance(query_name=query_name,
                                    other_name=item.restaurantName,
                                    embedding_name=item.embeddingName,
                                    query_cache=query_cache,
                                    model=model,
                                    redis_client=redis_client,
                                    minio=minio)
        result.append({"restaurantId": item.restaurantId,
                      "locationDistance": item.distance, "nameDistance": distance})
    return result
