import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_avatar_block = """                        src={`/avatars/${id}.jpg`} 
                        alt={`Ilustrasi ${id}`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        onError={(e) => {
                            // Fallback if .jpg doesn't exist, try .png
                            if (e.target.src.endsWith('.jpg')) {
                                e.target.src = `/avatars/${id}.png`;
                            } else {
                                // Fallback placeholder if neither exists
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/400x400/e2e8f0/64748b.png?text=Avatar+Faceless';
                            }
                        }}"""

new_avatar_block = """                        src={`/avatars/${id}.webp`} 
                        alt={`Ilustrasi ${id}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        onError={(e) => {
                            // Fallback to jpg if webp doesn't exist
                            if (e.target.src.endsWith('.webp')) {
                                e.target.src = `/avatars/${id}.jpg`;
                            } else {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/400x400/e2e8f0/64748b.png?text=Avatar+Faceless';
                            }
                        }}"""

content = content.replace(old_avatar_block, new_avatar_block)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Avatars mapped to .webp with loading lazy")
