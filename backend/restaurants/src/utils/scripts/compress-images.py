from PIL import Image
import os
from tqdm import tqdm

COMPRESSED_IMAGES_FOLDER = "../compressed-images"
ORIGINAL_IMAGAES_FOLDER = "/Users/dov/Desktop/voicefork_project/compressed/restaurants"


def compress(image_file: str, save_name: str):
    SCALE_FACTOR = 3
    filepath = os.path.join(os.getcwd(), image_file)
    image = Image.open(filepath)
    save_path = os.path.join(
        COMPRESSED_IMAGES_FOLDER, save_name)
    if os.path.exists(save_path):
        return
    image = image.resize((round(image.width/SCALE_FACTOR),
                         round(image.height/SCALE_FACTOR)))
    image.save(save_path,
               "JPEG",
               quality=50,)


if __name__ == "__main__":
    for index, filename in enumerate(tqdm(os.listdir(ORIGINAL_IMAGAES_FOLDER), desc="Compressing images")):
        if filename.endswith("jpg"):
            try:
                image_path = os.path.join(ORIGINAL_IMAGAES_FOLDER, filename)
                save_name = f"restaurant_image_{index}.jpeg"
                compress(image_path, save_name)
            except:
                print(f"failed for index: {index}")
                pass
