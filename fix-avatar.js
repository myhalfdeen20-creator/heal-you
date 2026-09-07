const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// We need to replace the entire CharacterAvatar component.
const startStr = "const CharacterAvatar = ({ id, colorHex, size = \"large\" }) => {";
const endStr = "        const WelcomeScreen =";

const startIndex = html.indexOf(startStr);
const endIndex = html.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const newComp = `const CharacterAvatar = ({ id, colorHex, size = "large" }) => {
            const dims = size === "large" ? "w-48 h-48 sm:w-56 sm:h-56" : "w-24 h-24";
            
            return (
                <div className={\`\${dims} rounded-full overflow-hidden shadow-xl mx-auto flex items-end justify-center relative\`} style={{backgroundColor: \`\${colorHex}20\`, border: \`4px solid \${colorHex}40\`}}>
                    <img 
                        src={\`/avatars/\${id}.png\`} 
                        alt={\`Ilustrasi \${id}\`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/400x400/e2e8f0/64748b.png?text=Avatar';
                        }}
                    />
                </div>
            );
        };

`;
    
    html = html.substring(0, startIndex) + newComp + html.substring(endIndex);
    fs.writeFileSync('public/index.html', html);
    console.log("Replaced CharacterAvatar component.");
} else {
    console.log("Could not find CharacterAvatar component.");
}
