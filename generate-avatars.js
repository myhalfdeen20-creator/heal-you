const fs = require('fs');
const { createCanvas } = require('canvas');

const archetypes = [
    { id: "khadijah", hex: "#0d6b52" },
    { id: "saudah", hex: "#c96a3f" },
    { id: "aisyah", hex: "#c2760c" },
    { id: "hafshah", hex: "#33348e" },
    { id: "ummusalamah", hex: "#6e274b" },
    { id: "zainabkhuzaimah", hex: "#4b663b" },
    { id: "zainabjahsy", hex: "#6e2528" },
    { id: "juwairiyah", hex: "#345c61" },
    { id: "ummuhabibah", hex: "#825e36" },
    { id: "shafiyyah", hex: "#684869" },
    { id: "maimunah", hex: "#5e6b4d" }
];

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r:0,g:0,b:0};
}

archetypes.forEach(arch => {
    const width = 400;
    const height = 400;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const rgb = hexToRgb(arch.hex);
    
    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
    grad.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`);
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    
    // Add some organic soft background circles
    ctx.beginPath();
    ctx.arc(100, 100, 150, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(300, 300, 200, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`;
    ctx.fill();

    // Draw Faceless Muslimah Silhouette (Hijab)
    ctx.save();
    
    // Shadow under the body
    ctx.beginPath();
    ctx.ellipse(200, 380, 120, 20, 0, 0, Math.PI*2);
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.filter = 'blur(10px)';
    ctx.fill();
    ctx.filter = 'none';

    // Body/Shoulders
    ctx.beginPath();
    ctx.moveTo(200, 150);
    ctx.bezierCurveTo(300, 170, 340, 280, 360, 400);
    ctx.lineTo(40, 400);
    ctx.bezierCurveTo(60, 280, 100, 170, 200, 150);
    ctx.fillStyle = arch.hex;
    ctx.fill();
    
    // Highlights on hijab folds
    ctx.beginPath();
    ctx.moveTo(200, 150);
    ctx.bezierCurveTo(250, 170, 280, 280, 300, 400);
    ctx.lineTo(40, 400);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fill();

    // Head / Hijab wrap
    ctx.beginPath();
    ctx.arc(200, 140, 75, 0, Math.PI * 2);
    ctx.fillStyle = arch.hex;
    ctx.fill();
    
    // Face area (blank/faceless) in a soft skin tone or just fully covered
    // A faceless muslimah typically just shows a blank face or is fully veiled from the back/side.
    // Let's do a soft skin tone oval for the face, but completely blank.
    ctx.beginPath();
    // Angle the face slightly down and left
    ctx.ellipse(180, 145, 45, 60, -0.2, 0, Math.PI*2);
    ctx.fillStyle = "#e8d5c4"; // soft skin tone
    ctx.fill();

    // Inner hijab shading around face
    ctx.beginPath();
    ctx.ellipse(180, 145, 45, 60, -0.2, 0, Math.PI*2);
    ctx.lineWidth = 8;
    ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
    ctx.stroke();

    // Veil wrap crossing over chest
    ctx.beginPath();
    ctx.moveTo(150, 200);
    ctx.bezierCurveTo(180, 230, 220, 250, 280, 200);
    ctx.bezierCurveTo(270, 280, 200, 320, 130, 250);
    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
    ctx.fill();

    ctx.restore();

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`public/avatars/${arch.id}.png`, buffer);
    console.log(`Generated avatars/${arch.id}.png`);
});
