import sys
from PIL import Image

def make_transparent(input_path, output_path, tolerance=220):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # Using a threshold approach: if all R, G, B are above tolerance, it's background
    # Since background is (240, 234, 222), a tolerance of 210 should catch it
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
    make_transparent(sys.argv[1], sys.argv[2], 210)
    print(f"Processed {sys.argv[1]} -> {sys.argv[2]}")
