from minio import Minio
from dotenv import load_dotenv
import os

load_dotenv()

USE_MINIO_LOCAL = os.getenv("USE_MINIO_LOCAL")
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
AWS_SESSION_TOKEN = os.getenv("AWS_SESSION_TOKEN")

MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY")
MINIO_IP = os.getenv("MINIO_IP")


class MinioService:
    def __init__(self):
        if USE_MINIO_LOCAL == "true":
            self.client = Minio(
                "minio-restaurants:9002",
                access_key=MINIO_ACCESS_KEY,
                secret_key=MINIO_SECRET_KEY,
                secure=False
            )
            self.BUCKET_NAME = "embeddings"
        else:
            self.client = Minio(
                "s3.amazonaws.com",
                access_key=AWS_ACCESS_KEY,
                secret_key=AWS_SECRET_KEY,
                session_token=AWS_SESSION_TOKEN)
            self.BUCKET_NAME = "voicefork-embeddings-bucket"

    def get_embedding(self, embedding_name: str):
        response = self.client.get_object(self.BUCKET_NAME, embedding_name)
        data = response.read()

        response.close()
        response.release_conn()

        return data
