import json
from Levenshtein import ratio
from ..services.FaissService import FaissService
import numpy as np


def compute_distance(query_name: str, other_name: str, embedding_name: str, query_cache: dict, model, redis_client, minio) -> float:
    levenshtein_distance = 1 - ratio(query_name, other_name)
    if query_name not in query_cache:
        query_embedding = model.embed_name(query_name)
        query_cache[query_name] = query_embedding
    else:
        query_embedding = query_cache[query_name]

    other_array = redis_client.get(embedding_name)
    if other_array is None:
        other_array = minio.get_embedding(embedding_name)
        redis_client.set(
            embedding_name, other_array)

    other_array = json.loads(other_array)
    other_embedding = model.array_to_tensor(other_array)
    use_distance = model.distance(query_embedding, other_embedding)

    WEIGHT = 0.5
    avg_distance = use_distance * WEIGHT + \
        levenshtein_distance * (1-WEIGHT)
    return avg_distance


def compute_distance_faiss(query_name: str, redis_client, model, k: int = 150) -> float:
    query_embedding = redis_client.get(query_name)
    if query_embedding is None:
        query_embedding = np.array(model.embed_name(query_name)).tolist()
        redis_client.set(query_name, json.dumps(query_embedding))
    else:
        query_embedding = json.loads(query_embedding)
    faiss_service = FaissService()
    if not faiss_service.is_ready():
        raise RuntimeError("Faiss index is still not ready")
    distances, indexes = faiss_service.search(query_embedding, k)
    return distances, indexes
