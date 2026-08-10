import sys
from PIL import Image

def make_transparent(input_path, output_path, tolerance=220):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        if item[0] >= tolerance and item[1] >= tolerance and item[2] >= tolerance:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    
    # Auto crop
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_bg.py <input> <output>")
        sys.exit(1)
    make_transparent(sys.argv[1], sys.argv[2], 235)
    print(f"Processed {sys.argv[1]} -> {sys.argv[2]}")
