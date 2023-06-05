from minio import Minio
import os
from tqdm import tqdm
from dotenv import load_dotenv
dotenv_path = '../../../.env'
load_dotenv(dotenv_path)


IMAGES_PATH = "./compressed-images"
BUCKET_NAME = "images"
EMBEDDINGS_BUCKET_NAME = "embeddings"


# Create client with access key and secret key with specific region.
client = Minio(
    "localhost:9002",
    access_key="V8VTzABPu24et972K4vz",
    secret_key="RlYBTAXQq88LpPmXxyk2oK07cycBsBLzv0M75YFw",
    secure=False  # Otherwise bug
)


def dump_images(images_folder):
    for index, filename in enumerate(tqdm(os.listdir(images_folder), desc="Uploading files")):
        image_path = os.path.join(images_folder, filename)
        client.fput_object(
            BUCKET_NAME, f"restaurant_image_{index}", image_path)


def empty_bucket(bucket_name):
    objects = client.list_objects(bucket_name, recursive=True)
    for obj in tqdm(objects, total=222_603):
        client.remove_object(bucket_name, obj.object_name)


if __name__ == "__main__":
    # dump_images(IMAGES_PATH)
    empty_bucket(EMBEDDINGS_BUCKET_NAME)
