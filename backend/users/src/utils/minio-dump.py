from minio import Minio
import os
from tqdm import tqdm

IMAGES_PATH = "./avatars" # Change the path according to where you put the "avatars" folder
BUCKET_NAME = "avatars"


# Create client with access key and secret key with specific region.
client = Minio(
    "localhost:9001",
    access_key="PsqYvxQYDmmKYO3PISeR",
    secret_key="B1EwyDs4jksgPK8gEM4QFEB8NcMpjpePm9TXN7NU",
    secure=False  # Otherwise bug
)


def dump_images(images_folder):
    for index, filename in enumerate(tqdm(os.listdir(images_folder), desc="Uploading files")):
        image_path = os.path.join(images_folder, filename)
        client.fput_object(
            BUCKET_NAME, f"avatar_{index}", image_path)


if __name__ == "__main__":
    dump_images(IMAGES_PATH)