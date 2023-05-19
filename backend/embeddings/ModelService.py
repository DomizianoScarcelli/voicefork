import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import os
import logging

logger = logging.getLogger(__name__)


class ModelService:
    def __init__(self):
        self.model = None
        self.CACHE_PATH = os.path.abspath("../../tmp/tfhub_modules/")

    def load_model(self):
        try:
            self._check_cache()
            self.model = hub.load(
                "https://tfhub.dev/google/universal-sentence-encoder-large/5")

        except ConnectionResetError as e:
            logger.error(
                f"ConnectionResetError: {e}, I will retry the download!")
            self.load_model()

    def _check_cache(self):
        if os.path.exists(self.CACHE_PATH):
            logger.info("Found cached files")
            for file in os.listdir(self.CACHE_PATH).copy():
                if file.endswith("tmp") or file.endswith("lock"):
                    os.remove(os.path.join(self.CACHE_PATH, file))
        else:
            logger.info("There are no cache files")

    def array_to_tensor(self, array: list):
        return tf.convert_to_tensor(array)

    def embed_name(self, name: str):
        embeddings = self.model([name])
        return embeddings[0]

    def distance(self, embedding1: tf.Tensor, embedding2: tf.Tensor):
        return 1 - self.similarity(embedding1, embedding2)

    def similarity(self, embedding1, embedding2):
        return np.inner(embedding1, embedding2)
