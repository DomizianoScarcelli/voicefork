from minio import Minio


class MinioService:
    def __init__(self):
        self.client = Minio(
            "localhost:9002",
            access_key="rxSdZSDLIM5nJcr1",
            secret_key="ATjj0yffTeQqIAgVC7GcxONoNGT0l7hS",
            secure=False  # Otherwise bug
        )
        self.BUCKET_NAME = "embeddings"

    def get_embedding(self, embedding_name: str):
        try:
            response = self.client.get_object(self.BUCKET_NAME, embedding_name)
            data = response.read()
            return data
        finally:
            response.close()
            response.release_conn()
