from PIL import Image
import os

img_path = r"d:\Projects\myPortofolio\public\ChatGPT Image 8 أغسطس 2026، 10_13_18 م.png"
img = Image.open(img_path).convert("RGBA")
width, height = img.size

# Let's inspect the exact emblem boundary
# The emblem is on the left
emblem_region = img.crop((0, 0, int(width * 0.35), height))

min_x, min_y, max_x, max_y = width, height, 0, 0

for y in range(emblem_region.height):
    for x in range(emblem_region.width):
        r, g, b, a = emblem_region.getpixel((x, y))
        # emblem colors are vibrant violet/indigo/blue
        if (r > 30 or g > 30 or b > 60) and (r + g + b > 100):
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y

print(f"Refined emblem bbox: ({min_x}, {min_y}) to ({max_x}, {max_y})")

padding = 6
crop_box = (
    max(0, min_x - padding),
    max(0, min_y - padding),
    min(emblem_region.width, max_x + padding),
    min(emblem_region.height, max_y + padding)
)

emblem = emblem_region.crop(crop_box)
print(f"Cropped Emblem size: {emblem.size}")

# Process transparency cleanly
emblem_clean = Image.new("RGBA", emblem.size, (0, 0, 0, 0))
for y in range(emblem.height):
    for x in range(emblem.width):
        r, g, b, a = emblem.getpixel((x, y))
        # Background is nearly black (r < 15, g < 15, b < 25)
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        if lum < 12:
            emblem_clean.putpixel((x, y), (0, 0, 0, 0))
        elif lum < 35:
            alpha = int(((lum - 12) / 23.0) * 255)
            emblem_clean.putpixel((x, y), (r, g, b, alpha))
        else:
            emblem_clean.putpixel((x, y), (r, g, b, 255))

emblem_clean.save(r"d:\Projects\myPortofolio\public\logo-icon.png", "PNG")

# Also create full logo (Emblem + "Portfolio" text) for Dark Mode & Light Mode
# Let's create an SVG / high-quality component for the logo!
# Square icons for PWA
def create_square_icon(src_img, size, bg_color=None, padding_ratio=0.14):
    icon = Image.new("RGBA", (size, size), bg_color if bg_color else (0, 0, 0, 0))
    target_content_size = int(size * (1.0 - padding_ratio * 2))
    
    src_w, src_h = src_img.size
    ratio = min(target_content_size / src_w, target_content_size / src_h)
    new_w = int(src_w * ratio)
    new_h = int(src_h * ratio)
    
    resized = src_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    offset_x = (size - new_w) // 2
    offset_y = (size - new_h) // 2
    
    icon.paste(resized, (offset_x, offset_y), resized)
    return icon

os.makedirs(r"d:\Projects\myPortofolio\public\icons", exist_ok=True)

# 192x192
icon_192 = create_square_icon(emblem_clean, 192, bg_color=(11, 15, 23, 255))
icon_192.save(r"d:\Projects\myPortofolio\public\icons\icon-192x192.png", "PNG")

# 512x512
icon_512 = create_square_icon(emblem_clean, 512, bg_color=(11, 15, 23, 255))
icon_512.save(r"d:\Projects\myPortofolio\public\icons\icon-512x512.png", "PNG")

# 512x512 maskable (with larger padding for safe zone)
icon_maskable = create_square_icon(emblem_clean, 512, bg_color=(11, 15, 23, 255), padding_ratio=0.22)
icon_maskable.save(r"d:\Projects\myPortofolio\public\icons\icon-maskable-512x512.png", "PNG")

# favicon
fav_32 = create_square_icon(emblem_clean, 32)
fav_32.save(r"d:\Projects\myPortofolio\public\favicon-32x32.png", "PNG")
fav_48 = create_square_icon(emblem_clean, 48)
fav_48.save(r"d:\Projects\myPortofolio\public\favicon.png", "PNG")
fav_48.save(r"d:\Projects\myPortofolio\src\app\favicon.ico", "ICO")

print("Refined emblem extracted successfully!")
