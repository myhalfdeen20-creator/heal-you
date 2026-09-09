import os
from PIL import Image

avatars_dir = 'public/avatars'
for filename in os.listdir(avatars_dir):
    if filename.endswith('.jpg'):
        jpg_path = os.path.join(avatars_dir, filename)
        webp_path = os.path.join(avatars_dir, filename.replace('.jpg', '.webp'))
        
        # Open image and convert to WebP
        with Image.open(jpg_path) as img:
            img.save(webp_path, 'webp', quality=80)
            
        print(f"Converted {filename} to WebP.")
        # Optional: remove original jpg to clean up
        # os.remove(jpg_path)
