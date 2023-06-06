import faiss
import tensorflow as tf
from typing import Tuple
import numpy as np
import json
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
        # self.minio_client = MinioService()
        self.DIMENSION = 512
        self.index = faiss.IndexFlatL2(self.DIMENSION)
        self.index_lookup = dict()
        self.INDEX_LOOKUP_PATH = "../../data/index_lookup.json"
        self.INDEX_PATH = "../../data/large.index"

    def is_ready(self):
        return self.index.is_trained

    def initialize_embeddings(self):
        self.index = read_index(self.INDEX_PATH)
        with open(self.INDEX_LOOKUP_PATH, "r") as f:
            self.index_lookup = json.load(f)

    def add(self, vector: list):
        self.index.add(np.array([vector]))

    def search(self, embedding: tf.Tensor, k: int) -> Tuple[np.ndarray, np.ndarray]:
        numpy_embedding = np.array([embedding])
        distances, indices = self.index.search(numpy_embedding, k)
        return distances, indices
