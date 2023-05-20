import json
from Levenshtein import ratio


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
