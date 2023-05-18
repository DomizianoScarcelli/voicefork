from fastapi import FastAPI
from MinioService import MinioService
from ModelService import ModelService
import json
import logging
from Levenshtein import ratio

logging.basicConfig(level=logging.DEBUG)  # Set log level to DEBUG

app = FastAPI()
model = ModelService()
minio = MinioService()

# TODO: remove old results from the cache otherwise it will saturate the memory
query_cache = {}


@app.on_event("startup")
async def startup_event():
    print("Loading model")
    model.load_model()
    print("Model loaded")


@app.get("/")
def welcome():
    return {"message": f"Welcome to the Embedding service!"}


@app.get("/distance-query")
def distance_query(query_name: str, other_name: str, embedding_name: str):
    if query_name not in query_cache:
        query_embedding = model.embed_name(query_name)
        query_cache[query_name] = query_embedding
    else:
        query_embedding = query_cache[query_name]
    other_array = json.loads(minio.get_embedding(embedding_name))
    other_embedding = model.array_to_tensor(other_array)
    use_distance = model.distance(query_embedding, other_embedding)
    levenshtein_distance = 1 - ratio(query_name, other_name)

    WEIGHT = 0.5
    avg_distance = use_distance * WEIGHT + \
        levenshtein_distance * (1-WEIGHT)
    return {"distance": avg_distance}
