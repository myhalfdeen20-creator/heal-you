const fs = require('fs');
const https = require('https');

const archetypes = [
    { id: "khadijah", prompt: "Minimalist elegant faceless muslimah illustration, deep emerald green hijab, mature dignified posture, standing confidently, soft watercolor texture" },
    { id: "saudah", prompt: "Minimalist elegant faceless muslimah illustration, warm terracotta orange hijab, gentle comforting posture, warmth and selflessness, soft watercolor texture" },
    { id: "aisyah", prompt: "Minimalist elegant faceless muslimah illustration, golden amber hijab, youthful dynamic posture, holding a classic book, soft watercolor texture" },
    { id: "hafshah", prompt: "Minimalist elegant faceless muslimah illustration, deep blue hijab, disciplined focused posture, guarding a manuscript, soft watercolor texture" },
    { id: "ummusalamah", prompt: "Minimalist elegant faceless muslimah illustration, deep maroon hijab, wise graceful posture, elegant and calm, soft watercolor texture" },
    { id: "zainabkhuzaimah", prompt: "Minimalist elegant faceless muslimah illustration, olive green hijab, generous caring posture, giving charity, soft watercolor texture" },
    { id: "zainabjahsy", prompt: "Minimalist elegant faceless muslimah illustration, crimson red hijab, noble artistic posture, crafting with hands, soft watercolor texture" },
    { id: "juwairiyah", prompt: "Minimalist elegant faceless muslimah illustration, teal hijab, peaceful liberating posture, radiant and calm, soft watercolor texture" },
    { id: "ummuhabibah", prompt: "Minimalist elegant faceless muslimah illustration, golden brown hijab, steadfast resilient posture, holding onto faith, soft watercolor texture" },
    { id: "shafiyyah", prompt: "Minimalist elegant faceless muslimah illustration, purple amethyst hijab, intellectual forgiving posture, dignified and reflective, soft watercolor texture" },
    { id: "maimunah", prompt: "Minimalist elegant faceless muslimah illustration, muted green hijab, humble devoted posture, peaceful and spiritual, soft watercolor texture" }
];

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                   .on('error', reject)
                   .once('close', () => resolve(filepath));
            } else {
                res.resume(); // Consume response data to free up memory
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

async function run() {
    for (const arch of archetypes) {
        const encodedPrompt = encodeURIComponent(arch.prompt);
        const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true`;
        const filepath = `public/avatars/${arch.id}.png`;
        
        console.log(`Downloading ${arch.id}...`);
        try {
            await downloadImage(url, filepath);
            console.log(`Successfully downloaded ${arch.id}.png`);
        } catch (err) {
            console.error(`Failed to download ${arch.id}:`, err.message);
        }
    }
    console.log("All downloads complete!");
}

run();
