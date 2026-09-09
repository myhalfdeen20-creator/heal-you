import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_ocean = """                } else if (type === 'ocean') {
                    const noise = this.createBrownianNoise();
                    const filter = this.ctx.createBiquadFilter();
                    filter.type = 'lowpass';
                    filter.frequency.value = 150;
                    
                    const lfo = this.ctx.createOscillator();
                    lfo.type = 'sine';
                    lfo.frequency.value = 0.08;
                    const freqGain = this.ctx.createGain();
                    freqGain.gain.value = 350;
                    
                    const vol = this.ctx.createGain();
                    vol.gain.value = 0.8;
                    
                    lfo.connect(freqGain);
                    freqGain.connect(filter.frequency);
                    noise.connect(filter);
                    filter.connect(vol);
                    vol.connect(this.master);
                    
                    noise.start();
                    lfo.start();
                    this.activeNodes.push(noise, filter, lfo, freqGain, vol);
                    
                } else if (type === 'rain') {"""

new_ocean = """                } else if (type === 'ocean') {
                    // Deep ocean rumble (constant background)
                    const deepNoise = this.createBrownianNoise();
                    const deepFilter = this.ctx.createBiquadFilter();
                    deepFilter.type = 'lowpass';
                    deepFilter.frequency.value = 100;
                    const deepVol = this.ctx.createGain();
                    deepVol.gain.value = 0.6;
                    deepNoise.connect(deepFilter);
                    deepFilter.connect(deepVol);
                    deepVol.connect(this.master);
                    deepNoise.start();
                    this.activeNodes.push(deepNoise, deepFilter, deepVol);
                    
                    // Crashing waves (periodic sweeping noise)
                    const waveNoise = this.createPinkNoise();
                    const waveFilter = this.ctx.createBiquadFilter();
                    waveFilter.type = 'bandpass';
                    waveFilter.frequency.value = 400;
                    waveFilter.Q.value = 0.8;
                    
                    // Wave timing LFO (slow, 0.08Hz = ~12.5 seconds per wave)
                    const waveLfo = this.ctx.createOscillator();
                    waveLfo.type = 'sine';
                    waveLfo.frequency.value = 0.08;
                    
                    // Sweep the frequency up during the wave crash
                    const freqGain = this.ctx.createGain();
                    freqGain.gain.value = 800; // Sweep from 400Hz up to 1200Hz
                    
                    // Control the volume of the wave
                    const waveVolLfo = this.ctx.createOscillator();
                    waveVolLfo.type = 'sine';
                    waveVolLfo.frequency.value = 0.08; // Match wave timing
                    
                    // Add a slight phase shift to volume relative to frequency
                    // so the loudest part is slightly before/during the highest frequency crash
                    // by using a delay node or just relying on the natural sine curve.
                    // To keep it simple, we use the same frequency.
                    const volGain = this.ctx.createGain();
                    volGain.gain.value = 1.0;
                    
                    const waveVol = this.ctx.createGain();
                    waveVol.gain.value = 0; // Starts quiet
                    
                    waveLfo.connect(freqGain);
                    freqGain.connect(waveFilter.frequency);
                    
                    waveVolLfo.connect(volGain);
                    volGain.connect(waveVol.gain);
                    
                    waveNoise.connect(waveFilter);
                    waveFilter.connect(waveVol);
                    waveVol.connect(this.master);
                    
                    waveNoise.start();
                    waveLfo.start();
                    
                    // Start the volume LFO slightly offset to simulate the crash
                    waveVolLfo.start(this.ctx.currentTime + 3); 
                    
                    this.activeNodes.push(waveNoise, waveFilter, waveLfo, freqGain, waveVolLfo, volGain, waveVol);
                    
                } else if (type === 'rain') {"""

# Fix spaces due to formatting
def normalize_spaces(text):
    return re.sub(r'\s+', ' ', text).strip()

old_ocean_pattern = re.compile(r'\} else if \(type === .ocean.\) \{.*?, vol\);\s*\} else if \(type === .rain.\) \{', re.DOTALL)
content = old_ocean_pattern.sub(new_ocean, content)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Ocean audio optimized!")
