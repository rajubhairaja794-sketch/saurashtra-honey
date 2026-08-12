from PIL import Image
img = Image.open('public/images/heritage/illus_beekeeping.png')
print(img.getpixel((0,0)))
