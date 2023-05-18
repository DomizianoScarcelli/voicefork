from typing import Union
from fastapi import FastAPI
from MinioService import MinioService
from ModelService import ModelService
import json

app = FastAPI()
model = ModelService()
minio = MinioService()


@app.get("/get-distance")
def distance_embeddings(query_name: str, embedding_name: str):
    query_embedding = model.embed_name(query_name)
    other_array = json.loads(minio.get_embedding(embedding_name))
    other_embedding = model.array_to_tensor(other_array)
    return model.distance(query_embedding, other_embedding)
