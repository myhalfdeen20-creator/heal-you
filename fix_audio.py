import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_audio_engine = """        const AudioEngine = {
            ctx: null,
            master: null,
            noise: null,
            lfo: null,
            init: function() {
                if (this.ctx) return;
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                this.master = this.ctx.createGain();
                this.master.gain.value = 0; // Start muted
                this.master.connect(this.ctx.destination);
                
                // Generates Brownian Noise (sounds like distant ocean/wind)
                const bufferSize = this.ctx.sampleRate * 2;
                const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                const data = buffer.getChannelData(0);
                let lastOut = 0;
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    data[i] = (lastOut + (0.02 * white)) / 1.02;
                    lastOut = data[i];
                    data[i] *= 3.5;
                }
                
                this.noise = this.ctx.createBufferSource();
                this.noise.buffer = buffer;
                this.noise.loop = true;
                
                const filter = this.ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 300; // Deep, muffled
                
                this.lfo = this.ctx.createOscillator();
                this.lfo.type = 'sine';
                this.lfo.frequency.value = 0.1; // Slow breathing/waves (10s cycle)
                
                const lfoGain = this.ctx.createGain();
                lfoGain.gain.value = 250;
                
                this.lfo.connect(lfoGain);
                lfoGain.connect(filter.frequency);
                
                this.noise.connect(filter);
                filter.connect(this.master);
                
                this.noise.start();
                this.lfo.start();
            },
            play: function() {
                this.init();
                if (this.ctx.state === 'suspended') this.ctx.resume();
                // Fade in gently over 3 seconds
                this.master.gain.setTargetAtTime(0.5, this.ctx.currentTime, 1.5);
            },
            stop: function() {
                if (!this.ctx) return;
                // Fade out gently
                this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
            }
        };"""

new_audio_engine = """        const AudioEngine = {
            ctx: null,
            master: null,
            activeNodes: [],
            birdInterval: null,
            currentType: 'wind',
            types: ['wind', 'ocean', 'rain', 'forest'],
            
            init: function() {
                if (this.ctx) return;
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                this.master = this.ctx.createGain();
                this.master.gain.value = 0; // Start muted
                this.master.connect(this.ctx.destination);
            },
            
            clear: function() {
                if (this.birdInterval) clearInterval(this.birdInterval);
                this.activeNodes.forEach(node => {
                    try { if (node.stop) node.stop(); } catch(e) {}
                    try { node.disconnect(); } catch(e) {}
                });
                this.activeNodes = [];
            },

            createPinkNoise: function() {
                const bufferSize = this.ctx.sampleRate * 2;
                const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                const data = buffer.getChannelData(0);
                let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    b0 = 0.99886 * b0 + white * 0.0555179;
                    b1 = 0.99332 * b1 + white * 0.0750759;
                    b2 = 0.96900 * b2 + white * 0.1538520;
                    b3 = 0.86650 * b3 + white * 0.3104856;
                    b4 = 0.55000 * b4 + white * 0.5329522;
                    b5 = -0.7616 * b5 - white * 0.0168980;
                    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                    data[i] *= 0.11;
                    b6 = white * 0.115926;
                }
                const noise = this.ctx.createBufferSource();
                noise.buffer = buffer;
                noise.loop = true;
                return noise;
            },
            
            createBrownianNoise: function() {
                const bufferSize = this.ctx.sampleRate * 2;
                const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                const data = buffer.getChannelData(0);
                let lastOut = 0;
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    data[i] = (lastOut + (0.02 * white)) / 1.02;
                    lastOut = data[i];
                    data[i] *= 3.5;
                }
                const noise = this.ctx.createBufferSource();
                noise.buffer = buffer;
                noise.loop = true;
                return noise;
            },
            
            chirp: function() {
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
            },
            
            buildSoundscape: function(type) {
                this.clear();
                
                if (type === 'wind') {
                    const noise = this.createPinkNoise();
                    const filter = this.ctx.createBiquadFilter();
                    filter.type = 'lowpass';
                    filter.frequency.value = 350;
                    
                    const lfo = this.ctx.createOscillator();
                    lfo.type = 'sine';
                    lfo.frequency.value = 0.05;
                    const lfoGain = this.ctx.createGain();
                    lfoGain.gain.value = 250;
                    
                    const vol = this.ctx.createGain();
                    vol.gain.value = 0.7;
                    
                    lfo.connect(lfoGain);
                    lfoGain.connect(filter.frequency);
                    noise.connect(filter);
                    filter.connect(vol);
                    vol.connect(this.master);
                    
                    noise.start();
                    lfo.start();
                    this.activeNodes.push(noise, filter, lfo, lfoGain, vol);
                    
                } else if (type === 'ocean') {
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
                    
                } else if (type === 'rain') {
                    const noise = this.createPinkNoise();
                    
                    const lpf = this.ctx.createBiquadFilter();
                    lpf.type = 'lowpass';
                    lpf.frequency.value = 1000;
                    
                    const hpf = this.ctx.createBiquadFilter();
                    hpf.type = 'highpass';
                    hpf.frequency.value = 300;
                    
                    const vol = this.ctx.createGain();
                    vol.gain.value = 1.2;
                    
                    noise.connect(lpf);
                    lpf.connect(hpf);
                    hpf.connect(vol);
                    vol.connect(this.master);
                    
                    noise.start();
                    this.activeNodes.push(noise, lpf, hpf, vol);
                    
                } else if (type === 'forest') {
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
                }
            },
            
            setType: function(type) {
                if (this.types.includes(type) && this.currentType !== type) {
                    this.currentType = type;
                    if (this.master && this.master.gain.value > 0.1) {
                        this.buildSoundscape(type);
                    }
                }
            },
            
            play: function() {
                this.init();
                if (this.ctx.state === 'suspended') this.ctx.resume();
                this.buildSoundscape(this.currentType);
                this.master.gain.setTargetAtTime(0.5, this.ctx.currentTime, 1.5);
            },
            
            stop: function() {
                if (!this.ctx) return;
                this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
                setTimeout(() => this.clear(), 600);
            }
        };"""

content = content.replace(old_audio_engine.strip(), new_audio_engine.strip())


old_app_top = """        const App = () => {
            const [isAudioPlaying, setIsAudioPlaying] = useState(false);
            const [showResetConfirm, setShowResetConfirm] = useState(false);

            const toggleAudio = () => {
                if (isAudioPlaying) {
                    AudioEngine.stop();
                    setIsAudioPlaying(false);
                } else {
                    AudioEngine.play();
                    setIsAudioPlaying(true);
                }
            };"""

new_app_top = """        const App = () => {
            const [isAudioPlaying, setIsAudioPlaying] = useState(false);
            const [ambientType, setAmbientType] = useState('wind');
            const [showResetConfirm, setShowResetConfirm] = useState(false);

            const toggleAudio = () => {
                if (isAudioPlaying) {
                    AudioEngine.stop();
                    setIsAudioPlaying(false);
                } else {
                    AudioEngine.play();
                    setIsAudioPlaying(true);
                }
            };

            useEffect(() => {
                AudioEngine.setType(ambientType);
            }, [ambientType]);"""

content = content.replace(old_app_top.strip(), new_app_top.strip())

old_audio_ui = """                        {/* Floating Audio Toggle */}
                        <button 
                            onClick={toggleAudio}
                            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-slate-200 text-slate-500 hover:text-[#6B688D] hover:bg-white transition-all duration-300"
                            aria-label={isAudioPlaying ? "Matikan Suara Ambien" : "Nyalakan Suara Ambien"}
                            title={isAudioPlaying ? "Matikan Suara Ambien" : "Nyalakan Suara Ambien"}
                        >
                            {isAudioPlaying ? <SoundOnIcon /> : <SoundOffIcon />}
                        </button>"""

new_audio_ui = """                        {/* Floating Audio Controls */}
                        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                            {isAudioPlaying && (
                                <div className="bg-white/90 backdrop-blur-md shadow-xl border border-slate-200 rounded-2xl p-2 flex flex-col gap-1 slide-up">
                                    {[
                                        { id: 'wind', name: 'Angin', icon: '🍃' },
                                        { id: 'ocean', name: 'Ombak', icon: '🌊' },
                                        { id: 'rain', name: 'Gerimis', icon: '🌧️' },
                                        { id: 'forest', name: 'Hutan', icon: '🌲' },
                                    ].map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setAmbientType(t.id)}
                                            className={`px-3 py-2 text-xs font-bold tracking-wider rounded-xl transition-colors text-left flex items-center gap-2 ${ambientType === t.id ? 'bg-[#6B688D] text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                                        >
                                            <span>{t.icon}</span> {t.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <button 
                                onClick={toggleAudio}
                                className="p-4 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-slate-200 text-slate-500 hover:text-[#6B688D] hover:bg-white transition-all duration-300"
                                aria-label={isAudioPlaying ? "Matikan Suara Ambien" : "Nyalakan Suara Ambien"}
                                title={isAudioPlaying ? "Matikan Suara Ambien" : "Nyalakan Suara Ambien"}
                            >
                                {isAudioPlaying ? <SoundOnIcon /> : <SoundOffIcon />}
                            </button>
                        </div>"""

content = content.replace(old_audio_ui.strip(), new_audio_ui.strip())

with open('public/index.html', 'w') as f:
    f.write(content)

print("Audio engine upgraded!")
