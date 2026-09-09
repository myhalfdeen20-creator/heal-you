import json

with open('package.json', 'r') as f:
    pkg = json.load(f)

pkg['scripts']['dev'] = "concurrently \"npm run watch:css\" \"node server.js\""
pkg['scripts']['build'] = "npm run build:css"
pkg['scripts']['build:css'] = "npx tailwindcss -i ./src/input.css -o ./public/styles.css --minify"
pkg['scripts']['watch:css'] = "npx tailwindcss -i ./src/input.css -o ./public/styles.css --watch"
pkg['scripts']['start'] = "node server.js"

with open('package.json', 'w') as f:
    json.dump(pkg, f, indent=2)

print("package.json updated.")
