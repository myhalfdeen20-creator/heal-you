const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const oldAvatarComp = `const CharacterAvatar = ({ id, colorHex, size = "large" }) => {
            const renderCharacterDetails = () => {
                switch(id) {
                    case "khadijah": return <path d="M50 80 Q 50 20, 100 20 Q 150 20, 150 80 L 170 180 L 30 180 Z" fill={colorHex} opacity="0.9"/>;
                    case "saudah": return <path d="M40 90 Q 50 30, 100 30 Q 150 30, 160 90 L 180 180 L 20 180 Z" fill={colorHex} opacity="0.85"/>;
                    case "aisyah": return <path d="M55 70 Q 50 15, 100 15 Q 150 15, 145 70 L 160 180 L 40 180 Z" fill={colorHex} opacity="0.95"/>;
                    case "hafshah": return <path d="M60 75 Q 60 25, 100 25 Q 140 25, 140 75 L 150 180 L 50 180 Z" fill={colorHex} opacity="0.9"/>;
                    case "ummusalamah": return <path d="M45 85 Q 50 25, 100 25 Q 150 25, 155 85 L 175 180 L 25 180 Z" fill={colorHex} opacity="0.9"/>;
                    case "zainabkhuzaimah": return <path d="M35 95 Q 50 35, 100 35 Q 150 35, 165 95 L 185 180 L 15 180 Z" fill={colorHex} opacity="0.8"/>;
                    case "zainabjahsy": return <path d="M50 75 Q 50 20, 100 20 Q 150 20, 150 75 L 165 180 L 35 180 Z" fill={colorHex} opacity="0.95"/>;
                    case "juwairiyah": return <path d="M55 80 Q 55 25, 100 25 Q 145 25, 145 80 L 160 180 L 40 180 Z" fill={colorHex} opacity="0.9"/>;
                    case "ummuhabibah": return <path d="M45 90 Q 50 30, 100 30 Q 150 30, 155 90 L 170 180 L 30 180 Z" fill={colorHex} opacity="0.85"/>;
                    case "shafiyyah": return <path d="M50 85 Q 50 25, 100 25 Q 150 25, 150 85 L 175 180 L 25 180 Z" fill={colorHex} opacity="0.9"/>;
                    case "maimunah": return <path d="M40 85 Q 50 25, 100 25 Q 150 25, 160 85 L 180 180 L 20 180 Z" fill={colorHex} opacity="0.9"/>;
                    default: return <path d="M50 80 Q 50 20, 100 20 Q 150 20, 150 80 L 170 180 L 30 180 Z" fill={colorHex} opacity="0.9"/>;
                }
            };
            
            const sizeClass = size === "large" ? "w-48 h-48 sm:w-56 sm:h-56" : "w-24 h-24";
            
            return (
                <div className={\`\${sizeClass} rounded-full overflow-hidden shadow-xl mx-auto flex items-end justify-center relative\`} style={{backgroundColor: \`\${colorHex}20\`, border: \`4px solid \${colorHex}40\`}}>
                    {/* Abstract silhouette representing a faceless, dignified figure wearing a hijab */}
                    <svg viewBox="0 0 200 200" className="w-full h-full transform translate-y-4" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="65" r="35" fill={colorHex} opacity="0.95" />
                        {renderCharacterDetails()}
                    </svg>
                </div>
            );
        };`;

const newAvatarComp = `const CharacterAvatar = ({ id, colorHex, size = "large" }) => {
            const sizeClass = size === "large" ? "w-48 h-48 sm:w-56 sm:h-56" : "w-24 h-24";
            
            return (
                <div className={\`\${sizeClass} rounded-full overflow-hidden shadow-xl mx-auto flex items-end justify-center relative\`} style={{backgroundColor: \`\${colorHex}20\`, border: \`4px solid \${colorHex}40\`}}>
                    <img 
                        src={\`/avatars/\${id}.png\`} 
                        alt={\`Ilustrasi Muslimah \${id}\`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/400x400/e2e8f0/64748b.png?text=Muslimah+Avatar';
                        }}
                    />
                </div>
            );
        };`;

html = html.replace(oldAvatarComp, newAvatarComp);
fs.writeFileSync('public/index.html', html);
console.log('Avatar component updated to use PNGs.');
