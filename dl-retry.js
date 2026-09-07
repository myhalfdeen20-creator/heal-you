const fs = require('fs');
const https = require('https');
const path = require('path');

const prompts = {
    "aisyah": "Aesthetic minimalist watercolor illustration, back view of a faceless muslim woman, completely blank face, wearing a long wide flowing golden amber syari hijab covering chest, youthful dynamic posture, reading an open classic manuscript, pastel earth tones background",
    "hafshah": "Aesthetic minimalist watercolor illustration, back view of a faceless muslim woman, completely blank face, wearing a long wide flowing deep blue syari hijab covering chest, disciplined and focused posture, firmly guarding a bound scroll, pastel earth tones background",
    "ummusalamah": "Aesthetic minimalist watercolor illustration, back view of a faceless muslim woman, completely blank face, wearing a long wide flowing deep maroon syari hijab covering chest, standing with wise graceful elegance, calm negotiating presence, pastel earth tones background",
    "zainabkhuzaimah": "Aesthetic minimalist watercolor illustration, back view of a faceless muslim woman, completely blank face, wearing a long wide flowing olive green syari hijab covering chest, generous caring posture, hands extended gently giving charity, pastel earth tones background",
    "zainabjahsy": "Aesthetic minimalist watercolor illustration, back view of a faceless muslim woman, completely blank face, wearing a long wide flowing crimson red syari hijab covering chest, noble artistic posture, hands engaged in sewing a cloth, pastel earth tones background",
    "juwairiyah": "Aesthetic minimalist watercolor illustration, back view of a faceless muslim woman, completely blank face, wearing a long wide flowing teal syari hijab covering chest, peaceful liberating posture, standing with open palms, pastel earth tones background",
    "ummuhabibah": "Aesthetic minimalist watercolor illustration, back view of a faceless muslim woman, completely blank face, wearing a long wide flowing golden brown syari hijab covering chest, steadfast resilient posture, hands clasped near chest holding a tasbih, pastel earth tones background",
    "shafiyyah": "Aesthetic minimalist watercolor illustration, back view of a faceless muslim woman, completely blank face, wearing a long wide flowing purple amethyst syari hijab covering chest, intellectual forgiving posture, dignified and reflective, holding a small flower, pastel earth tones background",
    "maimunah": "Aesthetic minimalist watercolor illustration, back view of a faceless muslim woman, completely blank face, wearing a long wide flowing muted green syari hijab covering chest, humble devoted posture, sitting peacefully in prayer, pastel earth tones background"
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function download(arch, prompt, retries = 5) {
    const encoded = encodeURIComponent(prompt + ", no face, no eyes, faceless, minimalist");
    const url = `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&nologo=true&seed=777`;
    const dest = path.join('public/avatars', `${arch}.png`);
    
    for (let i = 0; i < retries; i++) {
        try {
            await new Promise((resolve, reject) => {
                console.log(`Starting ${arch} (attempt ${i + 1})...`);
                const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
                    if (res.statusCode !== 200) {
                        res.resume();
                        return reject(new Error(`Status ${res.statusCode}`));
                    }
                    const file = fs.createWriteStream(dest);
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        resolve();
                    });
                });
                req.on('error', reject);
                req.setTimeout(20000, () => {
                    req.destroy();
                    reject(new Error('Timeout'));
                });
            });
            console.log(`Success ${arch}`);
            return;
        } catch (e) {
            console.error(`Failed ${arch}: ${e.message}`);
            await delay(5000);
        }
    }
}

async function run() {
    for (const [arch, prompt] of Object.entries(prompts)) {
        if(fs.existsSync(`public/avatars/${arch}.png`)) continue;
        await download(arch, prompt);
        await delay(3000); // 3 sec delay
    }
    console.log("All finished!");
}

run();
