from fastapi import FastAPI
from modules.services.ModelService import ModelService
import logging
from Levenshtein import ratio
import redis
from modules.utils.distance_utils import compute_distance, compute_distance_fais_with_removable_words
from modules.items.restaurants import RestaurantSearchQuery
from typing import List, Union
from modules.services.FaissService import FaissService
import os
import dotenv

logging.basicConfig(level=logging.INFO)
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

dotenv.load_dotenv("./.env")

app = FastAPI()
model = ModelService()

# TODO: remove old results from the cache otherwise it will saturate the memory
query_cache = {}

logger.info(f"Environment variables: {os.environ}")

host = "redis" if os.environ["LOCAL_MODE"] == "true" else "localhost"
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
