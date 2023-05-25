from minio import Minio
import os
from tqdm import tqdm

IMAGES_PATH = "./compressed-images"
BUCKET_NAME = "images"


# Create client with access key and secret key with specific region.
client = Minio(
    "localhost:9002",
    access_key="1Ld7gA6h6bjEooIc9CIQ",
    secret_key="33zgxhhVMZmfM8746uUOsbG0cGvQGn05IElrD1qR",
    secure=False  # Otherwise bug
)


def dump_images(images_folder):
    for index, filename in enumerate(tqdm(os.listdir(images_folder), desc="Uploading files")):
        image_path = os.path.join(images_folder, filename)
        client.fput_object(
            BUCKET_NAME, f"restaurant_image_{index}", image_path)


if __name__ == "__main__":
    dump_images(IMAGES_PATH)
