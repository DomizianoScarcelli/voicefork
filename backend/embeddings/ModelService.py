import tensorflow as tf
import tensorflow_hub as hub
import numpy as np


class ModelService:
    def __init__(self):
        self.model = hub.load(
            "https://tfhub.dev/google/universal-sentence-encoder-large/5")

    def array_to_tensor(self, array: list):
        return tf.convert_to_tensor(array)

    def embed_name(self, name: str):
        embeddings = self.model([name])
        return embeddings[0]

    def distance(self, embedding1: tf.Tensor, embedding2: tf.Tensor):
        return 1 - self.similarity(embedding1, embedding2)

    def similarity(self, embedding1, embedding2):
        return np.inner(embedding1, embedding2)
