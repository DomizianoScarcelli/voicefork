from minio import Minio
import os
from tqdm import tqdm

IMAGES_PATH = "./avatars" # Change the path according to where you put the "avatars" folder
BUCKET_NAME = "voicefork-avatars"


# Create client with access key and secret key with specific region.
client = Minio(
    "s3.amazonaws.com",
    access_key="ASIATG7YT5XSGJK7KDXS",
    secret_key="nM1fNuE2bViM0LihGv0fcAi0ZiTCSxLcoSTyqRVO",
    session_token="FwoGZXIvYXdzEN7//////////wEaDCtrsLS5M1Lj6CrUTSLWARSw8hWPU4ejvIccAck+kgGgQalmNgkyo15ZgEOW6YC/mDwz/dQSp5QkG7br+jM5JddM3nW5D+xC2HKFxLr/C/yCFJH0ATN7hgMPwmmIBd4/bDQTz0t8VqV0VTDIccf90jaYdYmpAjoDxNF7GSb6bgurrNLLi7ip2lFI1/5xrDdlfnu9kqZd0xfAsIFsVWIzxBFaBhZwFVEwN29ZPU5HgrdR4t041bPoXXsmiQvmh8EwXYqnzgrx4u4UkNY4D++iMe2K/rAfXBeBXIUZIy5Y3qtsESVy2lYo5pbyowYyLR8pzpK8boQx6y6f9ouku5kMdiGJyp7k5JeVPYDIstolzqdjYXHKmHhtm3hJFg==",
)


def dump_images(images_folder):
    for index, filename in enumerate(tqdm(os.listdir(images_folder), desc="Uploading files")):
        image_path = os.path.join(images_folder, filename)
        client.fput_object(
            BUCKET_NAME, f"avatar_{index}", image_path)


if __name__ == "__main__":
    dump_images(IMAGES_PATH)