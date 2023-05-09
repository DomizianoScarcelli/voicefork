from PIL import Image
import os
from tqdm import tqdm
import numpy as np


COMPRESSED_IMAGES_FOLDER = "/Users/dov/Desktop/voicefork_project/voicefork/backend/restaurants/src/utils/compressed-images"
FACE_COMPRESSED_IMAGES_FOLDER = "/Users/dov/Desktop/voicefork_project/voicefork/backend/restaurants/src/utils/face-compressed-images"
ORIGINAL_IMAGAES_FOLDER = "/Users/dov/Desktop/voicefork_project/compressed/restaurants"


def compress(image_file: str, save_name: str):
    filepath = os.path.join(os.getcwd(), image_file)
    image = Image.open(filepath)
    save_path = os.path.join(
        COMPRESSED_IMAGES_FOLDER, save_name)
    if os.path.exists(save_path):
        return
    image.save(save_path,
               "JPEG",
               quality=20)


if __name__ == "__main__":
    for index, filename in enumerate(tqdm(os.listdir(ORIGINAL_IMAGAES_FOLDER), desc="Compressing images")):
        if filename.endswith("jpg"):
            try:
                image_path = os.path.join(ORIGINAL_IMAGAES_FOLDER, filename)
                save_name = f"restaurant_image_{index}.jpeg"
                compress(image_path, save_name)
            except:
                pass
