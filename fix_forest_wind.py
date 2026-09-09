import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_forest_leaves = """                    const leavesVol = this.ctx.createGain();
                    leavesVol.gain.value = 0.35; // Base volume for leaves"""

new_forest_leaves = """                    const leavesVol = this.ctx.createGain();
                    leavesVol.gain.value = 0.08; // Sangat kecil, hanya terdengar sayup-sayup"""

old_forest_deep = """                    const deepVol = this.ctx.createGain();
                    deepVol.gain.value = 0.4;"""

new_forest_deep = """                    const deepVol = this.ctx.createGain();
                    deepVol.gain.value = 0.1; // Rumble di kejauhan yang sangat hening"""

content = content.replace(old_forest_leaves, new_forest_leaves)
content = content.replace(old_forest_deep, new_forest_deep)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Forest audio adjusted!")
