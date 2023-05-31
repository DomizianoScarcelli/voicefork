import json
from Levenshtein import ratio
from ..services.FaissService import FaissService
import numpy as np
from typing import Dict, Tuple
import logging
REMOVABLE_WORDS = ["ristorante", "pizzeria",
                   'bisteccheria', "gelateria", "trattoria"]
logger = logging.getLogger(__name__)


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


def compute_distance_fais_with_removable_words(query_name: str, redis_client, model, k: int = 150) -> Dict[int, float]:
    clean_query_name = " ".join(
        [word for word in query_name.split(" ") if word.lower() not in REMOVABLE_WORDS])

    indexes: Dict[int, float] = dict()
    dist, ind = compute_distance_faiss(
        clean_query_name, redis_client, model, k)
    for (distance, index) in zip(dist[0].tolist(), ind[0].tolist()):
        if index not in indexes:
            indexes[index] = distance
        else:
            current_distance = indexes[index]
            indexes[index] = min(distance, current_distance)
    return indexes


def compute_distance_faiss(query_name: str, redis_client, model, k: int = 150) -> Tuple[np.ndarray, np.ndarray]:
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
