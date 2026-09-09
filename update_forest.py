import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_chirp = """            chirp: function() {
                if (!this.ctx || this.master.gain.value < 0.01) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                const baseFreq = 2000 + Math.random() * 2000;
                osc.type = 'sine';
                osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(baseFreq + 1500, this.ctx.currentTime + 0.15);
                
                gain.gain.setValueAtTime(0, this.ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.05);
                gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.15);
                
                osc.connect(gain);
                gain.connect(this.master);
                
                osc.start(this.ctx.currentTime);
                osc.stop(this.ctx.currentTime + 0.15);
                
                this.activeNodes.push(osc, gain);
                
                if (Math.random() > 0.6) {
                    setTimeout(() => this.chirp(), 200 + Math.random() * 100);
                }
            },"""

new_chirp = """            chirp: function(baseFreq = 2000, pan = 0, isResponse = false) {
                if (!this.ctx || this.master.gain.value < 0.01) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                let panner;
                if (this.ctx.createStereoPanner) {
                    panner = this.ctx.createStereoPanner();
                    panner.pan.value = pan;
                } else {
                    panner = this.ctx.createGain(); // fallback
                }
                
                osc.type = 'sine';
                const now = this.ctx.currentTime;
                
                if (Math.random() > 0.5) {
                    // Swooping whistle
                    osc.frequency.setValueAtTime(baseFreq, now);
                    osc.frequency.exponentialRampToValueAtTime(baseFreq + 1000, now + 0.15);
                    osc.frequency.exponentialRampToValueAtTime(baseFreq - 500, now + 0.3);
                    
                    gain.gain.setValueAtTime(0, now);
                    gain.gain.linearRampToValueAtTime(0.15, now + 0.1);
                    gain.gain.linearRampToValueAtTime(0, now + 0.3);
                    osc.start(now);
                    osc.stop(now + 0.3);
                } else {
                    // Quick double chirp
                    osc.frequency.setValueAtTime(baseFreq, now);
                    osc.frequency.exponentialRampToValueAtTime(baseFreq + 800, now + 0.1);
                    osc.frequency.setValueAtTime(baseFreq - 200, now + 0.15);
                    osc.frequency.exponentialRampToValueAtTime(baseFreq + 1000, now + 0.25);
                    
                    gain.gain.setValueAtTime(0, now);
                    gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
                    gain.gain.linearRampToValueAtTime(0, now + 0.1);
                    gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
                    gain.gain.linearRampToValueAtTime(0, now + 0.25);
                    osc.start(now);
                    osc.stop(now + 0.25);
                }
                
                osc.connect(gain);
                gain.connect(panner);
                panner.connect(this.master);
                
                this.activeNodes.push(osc, gain, panner);
                
                if (!isResponse && Math.random() > 0.3) {
                    const responseDelay = 400 + Math.random() * 800; // 0.4s to 1.2s
                    const responsePan = -pan * (0.5 + Math.random() * 0.5); // Opposite side
                    const responseFreq = baseFreq > 2200 ? 1500 + Math.random()*400 : 2400 + Math.random()*500;
                    setTimeout(() => this.chirp(responseFreq, responsePan, true), responseDelay);
                    
                    if (Math.random() > 0.7) {
                        setTimeout(() => this.chirp(2000 + Math.random()*1000, pan * 0.8, true), responseDelay + 500 + Math.random()*500);
                    }
                }
            },"""

old_forest = """                } else if (type === 'forest') {
                    const noise = this.createPinkNoise();
                    const filter = this.ctx.createBiquadFilter();
                    filter.type = 'lowpass';
                    filter.frequency.value = 200;
                    
                    const lfo = this.ctx.createOscillator();
                    lfo.type = 'sine';
                    lfo.frequency.value = 0.03;
                    const lfoGain = this.ctx.createGain();
                    lfoGain.gain.value = 100;
                    
                    const vol = this.ctx.createGain();
                    vol.gain.value = 0.5;
                    
                    lfo.connect(lfoGain);
                    lfoGain.connect(filter.frequency);
                    noise.connect(filter);
                    filter.connect(vol);
                    vol.connect(this.master);
                    
                    noise.start();
                    lfo.start();
                    this.activeNodes.push(noise, filter, lfo, lfoGain, vol);
                    
                    this.birdInterval = setInterval(() => {
                        if (Math.random() > 0.3) this.chirp();
                    }, 4000);
                }"""

new_forest = """                } else if (type === 'forest') {
                    // Wind rustling through leaves
                    const leavesNoise = this.createPinkNoise();
                    const leavesFilter = this.ctx.createBiquadFilter();
                    leavesFilter.type = 'bandpass';
                    leavesFilter.frequency.value = 1200; // Higher freq for leaves
                    leavesFilter.Q.value = 0.5;
                    
                    const leavesLfo = this.ctx.createOscillator();
                    leavesLfo.type = 'sine';
                    leavesLfo.frequency.value = 0.04; // Slow gusts
                    const leavesLfoGain = this.ctx.createGain();
                    leavesLfoGain.gain.value = 800; // Sweep freq
                    
                    const leavesVolLfo = this.ctx.createOscillator();
                    leavesVolLfo.type = 'sine';
                    leavesVolLfo.frequency.value = 0.06;
                    const leavesVolLfoGain = this.ctx.createGain();
                    leavesVolLfoGain.gain.value = 0.25;
                    
                    const leavesVol = this.ctx.createGain();
                    leavesVol.gain.value = 0.35; // Base volume for leaves
                    
                    leavesLfo.connect(leavesLfoGain);
                    leavesLfoGain.connect(leavesFilter.frequency);
                    
                    leavesVolLfo.connect(leavesVolLfoGain);
                    leavesVolLfoGain.connect(leavesVol.gain);
                    
                    leavesNoise.connect(leavesFilter);
                    leavesFilter.connect(leavesVol);
                    leavesVol.connect(this.master);
                    
                    leavesNoise.start();
                    leavesLfo.start();
                    leavesVolLfo.start();
                    this.activeNodes.push(leavesNoise, leavesFilter, leavesLfo, leavesLfoGain, leavesVolLfo, leavesVolLfoGain, leavesVol);
                    
                    // Distant deep ambient rumble
                    const deepNoise = this.createPinkNoise();
                    const deepFilter = this.ctx.createBiquadFilter();
                    deepFilter.type = 'lowpass';
                    deepFilter.frequency.value = 200;
                    const deepVol = this.ctx.createGain();
                    deepVol.gain.value = 0.4;
                    deepNoise.connect(deepFilter);
                    deepFilter.connect(deepVol);
                    deepVol.connect(this.master);
                    deepNoise.start();
                    this.activeNodes.push(deepNoise, deepFilter, deepVol);
                    
                    // Bird conversation interval
                    this.birdInterval = setInterval(() => {
                        if (Math.random() > 0.4) {
                            const initPan = (Math.random() * 1.6) - 0.8; // -0.8 to 0.8
                            const initFreq = 1500 + Math.random() * 1500;
                            this.chirp(initFreq, initPan, false);
                        }
                    }, 4500);
                }"""

# Fix spaces due to formatting
def normalize_spaces(text):
    return re.sub(r'\s+', ' ', text).strip()

def fix_content(content, old, new):
    import re
    # We will just replace it cleanly
    # First, let's remove everything from chirp to the end of forest, then insert new.
    pass

# We will use simple replace with regex matching to ignore exact indentation issues
old_chirp_pattern = re.compile(r'chirp:\s*function\(\)\s*\{.*?Math\.random\(\)\s*\*\s*100\);\s*\}\s*\},', re.DOTALL)
content = old_chirp_pattern.sub(new_chirp + ',', content)

old_forest_pattern = re.compile(r'\} else if \(type === .forest.\) \{.*?, 4000\);\s*\}', re.DOTALL)
content = old_forest_pattern.sub(new_forest, content)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Audio optimized!")
