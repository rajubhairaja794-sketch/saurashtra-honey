from PIL import Image
import sys
import glob

def process_image(input_path, output_path):
    print(f"Processing {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    
    # We want dark lines to be opaque and white background to be transparent.
    # We can use the luminance as an inverse alpha mask.
    
    for r, g, b, a in data:
        # luminance
        lum = int(0.299*r + 0.587*g + 0.114*b)
        
        if lum > 250:
            new_data.append((255, 255, 255, 0))
        else:
            # Inverse luminance for alpha. 
            # 0 (black) -> 255 (opaque)
            # 255 (white) -> 0 (transparent)
            alpha = 255 - lum
            
            # Since the alpha channel determines opacity, we should make the RGB 
            # pure dark brown or just keep original RGB but darken it slightly
            # because multiplying it by alpha will make it lighter if we don't.
            # Actually, keeping original RGB works well enough.
            new_data.append((r, g, b, alpha))

    img.putdata(new_data)
    img.save(output_path, "PNG")

images = [
    ("public/images/bg_illustrations/floral.png", "public/images/bg_illustrations/floral_alpha.png"),
    ("public/images/bg_illustrations/honeycomb.png", "public/images/bg_illustrations/honeycomb_alpha.png"),
    ("public/images/bg_illustrations/dipper.png", "public/images/bg_illustrations/dipper_alpha.png"),
    ("public/images/bg_illustrations/bees.png", "public/images/bg_illustrations/bees_alpha.png"),
    ("public/images/heritage/icon_honeycomb.png", "public/images/heritage/icon_honeycomb_alpha.png"),
    ("public/images/heritage/icon_wildflowers.png", "public/images/heritage/icon_wildflowers_alpha.png")
]

for in_p, out_p in images:
    process_image(in_p, out_p)
    
print("Done!")
