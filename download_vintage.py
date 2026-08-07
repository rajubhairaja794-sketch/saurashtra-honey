import urllib.request
import os

os.makedirs('public/images/heritage', exist_ok=True)

urls = {
    # 1. Honeycomb and bees
    "vintage_honeycomb.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Bees_and_honeycomb.jpg/640px-Bees_and_honeycomb.jpg",
    # 2. Wildflowers
    "vintage_wildflower.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/A_curious_herbal_containing_five_hundred_cuts_-_plate_30.jpg/640px-A_curious_herbal_containing_five_hundred_cuts_-_plate_30.jpg",
    # 3. Honey jar / Apothecary jar
    "vintage_jar.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Apothecary_jar_-_S%C3%A8vres.jpg/640px-Apothecary_jar_-_S%C3%A8vres.jpg",
    # 4. Beekeeper / Apiary
    "vintage_beekeeper.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/The_Apiary_%281881%29.jpg/640px-The_Apiary_%281881%29.jpg"
}

for name, url in urls.items():
    try:
        urllib.request.urlretrieve(url, f"public/images/heritage/{name}")
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
