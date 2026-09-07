#!/bin/bash
declare -A prompts=(
    ["juwairiyah"]="Minimalist%20elegant%20faceless%20muslimah%20illustration%2C%20teal%20hijab%2C%20peaceful%20liberating%20posture%2C%20radiant%20and%20calm%2C%20soft%20watercolor%20texture"
    ["zainabjahsy"]="Minimalist%20elegant%20faceless%20muslimah%20illustration%2C%20crimson%20red%20hijab%2C%20noble%20artistic%20posture%2C%20crafting%20with%20hands%2C%20soft%20watercolor%20texture"
    ["zainabkhuzaimah"]="Minimalist%20elegant%20faceless%20muslimah%20illustration%2C%20olive%20green%20hijab%2C%20generous%20caring%20posture%2C%20giving%20charity%2C%20soft%20watercolor%20texture"
)

for arch in "${!prompts[@]}"; do
    prompt="${prompts[$arch]}"
    url="https://image.pollinations.ai/prompt/$prompt?width=512&height=512&nologo=true"
    echo "Downloading $arch..."
    curl -s -L -o "public/avatars/$arch.png" "$url"
done
echo "Done final 3"
