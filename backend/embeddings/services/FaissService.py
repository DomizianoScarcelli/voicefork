import faiss
import tensorflow as tf
from .MinioService import MinioService
from typing import Tuple
import numpy as np
import json
from minio.datatypes import Object
from faiss import write_index, read_index
import logging

logger = logging.getLogger(__name__)


def singleton(class_):
    instances = {}

    def get_instance(*args, **kwargs):
        if class_ not in instances:
            instances[class_] = class_(*args, **kwargs)
        return instances[class_]
    return get_instance


@singleton
class FaissService:
    def __init__(self):
        self.minio_client = MinioService()
        self.DIMENSION = len(json.loads(
            self.minio_client.get_embedding("embedding_0")))
        self.index = faiss.IndexFlatL2(self.DIMENSION)
        self.index_lookup = dict()
        self.INDEX_LOOKUP_PATH = "./embeddings/data/index_lookup.json"

    def is_ready(self):
        return self.index.ntotal == self.minio_client.NUM_OBJECTS and self.index.is_trained

    def initialize_embeddings(self):
        try:
            self.index = read_index("./embeddings/data/large.index")
            with open(self.INDEX_LOOKUP_PATH, "r") as f:
                self.index_lookup = json.load(f)
        except:
            embeddings = self.minio_client.client.list_objects(
                self.minio_client.BUCKET_NAME)
            obj: Object
            for index, obj in enumerate(embeddings):
                if index % 5000 == 0:
                    logger.info(f"Progressing... {index}")
                embedding_name = obj.object_name
                embedding = self.minio_client.get_embedding(embedding_name)
                self.add(json.loads(embedding))
                self.index_lookup[index] = embedding_name
            write_index(self.index, "./embeddings/data/large.index")
            with open(self.INDEX_LOOKUP_PATH, "w") as f:
                json.dump(self.index_lookup, f)

    def add(self, vector: list):
        self.index.add(np.array([vector]))

    def search(self, embedding: tf.Tensor, k: int) -> Tuple[np.ndarray, np.ndarray]:
        numpy_embedding = np.array([embedding])
        distances, indices = self.index.search(numpy_embedding, k)
        return distances, indices
