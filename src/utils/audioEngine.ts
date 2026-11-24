import type { AmbientType } from '../types';

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private activeNodes: AudioNode[] = [];
  private activeSources: Array<AudioScheduledSourceNode> = [];
  private birdInterval: number | null = null;
  private pendingTimeouts = new Set<number>();
  private stopClearTimeout: number | null = null;
  private currentType: AmbientType = 'wind';
  private playing = false;

  private ensureContext(): boolean {
    if (this.ctx && this.master) return true;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return false;

    this.ctx = new AudioCtx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);
    return true;
  }

  private scheduleTimeout(fn: () => void, delayMs: number): number {
    const id = window.setTimeout(() => {
      this.pendingTimeouts.delete(id);
      fn();
    }, delayMs);
    this.pendingTimeouts.add(id);
    return id;
  }

  private clearTimers(): void {
    if (this.birdInterval !== null) {
      window.clearInterval(this.birdInterval);
      this.birdInterval = null;
    }
    this.pendingTimeouts.forEach((id) => window.clearTimeout(id));
    this.pendingTimeouts.clear();
  }

  private clearNodes(): void {
    this.clearTimers();

    this.activeSources.forEach((source) => {
      try {
        source.stop();
      } catch {
        // Already stopped
      }
      try {
        source.disconnect();
      } catch {
        // Already disconnected
      }
    });
    this.activeSources = [];

    this.activeNodes.forEach((node) => {
      try {
        node.disconnect();
      } catch {
        // Already disconnected
      }
    });
    this.activeNodes = [];
  }

  private createPinkNoise(): AudioBufferSourceNode {
    const ctx = this.ctx!;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    let b3 = 0;
    let b4 = 0;
    let b5 = 0;
    let b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    return noise;
  }

  private createBrownianNoise(): AudioBufferSourceNode {
    const ctx = this.ctx!;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    return noise;
  }

  private chirp(baseFreq = 2000, pan = 0, isResponse = false): void {
    if (!this.ctx || !this.master || !this.playing || this.currentType !== 'forest') {
      return;
    }

    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    let panner: AudioNode;

    if (typeof ctx.createStereoPanner === 'function') {
      const stereo = ctx.createStereoPanner();
      stereo.pan.value = Math.max(-1, Math.min(1, pan));
      panner = stereo;
    } else {
      panner = ctx.createGain();
    }

    osc.type = 'sine';
    const now = ctx.currentTime;
    const endTime = Math.random() > 0.5 ? now + 0.3 : now + 0.25;

    if (endTime === now + 0.3) {
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 1000, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(Math.max(400, baseFreq - 500), now + 0.3);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.1);
      gain.gain.linearRampToValueAtTime(0, now + 0.3);
    } else {
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 800, now + 0.1);
      osc.frequency.setValueAtTime(Math.max(400, baseFreq - 200), now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 1000, now + 0.25);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.11, now + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + 0.1);
      gain.gain.linearRampToValueAtTime(0.11, now + 0.15);
      gain.gain.linearRampToValueAtTime(0, now + 0.25);
    }

    osc.connect(gain);
    gain.connect(panner);
    panner.connect(this.master);

    // Prevent memory leaks: disconnect short-lived chirp nodes automatically when finished
    osc.onended = () => {
      try {
        osc.disconnect();
        gain.disconnect();
        panner.disconnect();
      } catch {
        // Ignore cleanup errors
      }
    };

    osc.start(now);
    osc.stop(endTime + 0.02);

    if (!isResponse && Math.random() > 0.35) {
      const responseDelay = 450 + Math.random() * 800;
      const responsePan = -pan * (0.5 + Math.random() * 0.5);
      const responseFreq =
        baseFreq > 2200 ? 1500 + Math.random() * 400 : 2400 + Math.random() * 500;
      this.scheduleTimeout(() => this.chirp(responseFreq, responsePan, true), responseDelay);

      if (Math.random() > 0.72) {
        this.scheduleTimeout(
          () => this.chirp(2000 + Math.random() * 900, pan * 0.8, true),
          responseDelay + 550 + Math.random() * 450
        );
      }
    }
  }

  private buildSoundscape(type: AmbientType): void {
    if (!this.ctx || !this.master) return;
    this.clearNodes();

    const ctx = this.ctx;
    const master = this.master;

    if (type === 'wind') {
      const noise = this.createPinkNoise();
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 360;

      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.05;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 220;

      const vol = ctx.createGain();
      vol.gain.value = 0.65;

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      noise.connect(filter);
      filter.connect(vol);
      vol.connect(master);

      noise.start();
      lfo.start();
      this.activeSources.push(noise, lfo);
      this.activeNodes.push(filter, lfoGain, vol);
    } else if (type === 'ocean') {
      // Deep ocean bed
      const deepNoise = this.createBrownianNoise();
      const deepFilter = ctx.createBiquadFilter();
      deepFilter.type = 'lowpass';
      deepFilter.frequency.value = 110;
      const deepVol = ctx.createGain();
      deepVol.gain.value = 0.45;
      deepNoise.connect(deepFilter);
      deepFilter.connect(deepVol);
      deepVol.connect(master);
      deepNoise.start();
      this.activeSources.push(deepNoise);
      this.activeNodes.push(deepFilter, deepVol);

      // Periodic rolling waves with non-negative envelope (0.06 to 0.76)
      const waveNoise = this.createPinkNoise();
      const waveFilter = ctx.createBiquadFilter();
      waveFilter.type = 'bandpass';
      waveFilter.frequency.value = 460;
      waveFilter.Q.value = 0.7;

      const freqLfo = ctx.createOscillator();
      freqLfo.type = 'sine';
      freqLfo.frequency.value = 0.085;
      const freqGain = ctx.createGain();
      freqGain.gain.value = 340;
      freqLfo.connect(freqGain);
      freqGain.connect(waveFilter.frequency);

      const waveVol = ctx.createGain();
      waveVol.gain.value = 0.41; // DC base level so sine modulation stays strictly positive
      const volLfo = ctx.createOscillator();
      volLfo.type = 'sine';
      volLfo.frequency.value = 0.085;
      const volLfoGain = ctx.createGain();
      volLfoGain.gain.value = 0.35; // 0.41 +/- 0.35 => [0.06, 0.76]
      volLfo.connect(volLfoGain);
      volLfoGain.connect(waveVol.gain);

      waveNoise.connect(waveFilter);
      waveFilter.connect(waveVol);
      waveVol.connect(master);

      waveNoise.start();
      freqLfo.start();
      volLfo.start();
      this.activeSources.push(waveNoise, freqLfo, volLfo);
      this.activeNodes.push(waveFilter, freqGain, waveVol, volLfoGain);
    } else if (type === 'rain') {
      const noise = this.createPinkNoise();
      const lpf = ctx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.value = 1050;

      const hpf = ctx.createBiquadFilter();
      hpf.type = 'highpass';
      hpf.frequency.value = 280;

      const vol = ctx.createGain();
      vol.gain.value = 1.05;

      noise.connect(lpf);
      lpf.connect(hpf);
      hpf.connect(vol);
      vol.connect(master);

      noise.start();
      this.activeSources.push(noise);
      this.activeNodes.push(lpf, hpf, vol);
    } else if (type === 'forest') {
      const leavesNoise = this.createPinkNoise();
      const leavesFilter = ctx.createBiquadFilter();
      leavesFilter.type = 'bandpass';
      leavesFilter.frequency.value = 1150;
      leavesFilter.Q.value = 0.6;

      const leavesLfo = ctx.createOscillator();
      leavesLfo.type = 'sine';
      leavesLfo.frequency.value = 0.04;
      const leavesLfoGain = ctx.createGain();
      leavesLfoGain.gain.value = 500;
      leavesLfo.connect(leavesLfoGain);
      leavesLfoGain.connect(leavesFilter.frequency);

      const leavesVol = ctx.createGain();
      leavesVol.gain.value = 0.14;
      const leavesVolLfo = ctx.createOscillator();
      leavesVolLfo.type = 'sine';
      leavesVolLfo.frequency.value = 0.06;
      const leavesVolLfoGain = ctx.createGain();
      leavesVolLfoGain.gain.value = 0.09; // Keeps volume positive [0.05, 0.23]
      leavesVolLfo.connect(leavesVolLfoGain);
      leavesVolLfoGain.connect(leavesVol.gain);

      leavesNoise.connect(leavesFilter);
      leavesFilter.connect(leavesVol);
      leavesVol.connect(master);

      leavesNoise.start();
      leavesLfo.start();
      leavesVolLfo.start();
      this.activeSources.push(leavesNoise, leavesLfo, leavesVolLfo);
      this.activeNodes.push(leavesFilter, leavesLfoGain, leavesVol, leavesVolLfoGain);

      const deepNoise = this.createPinkNoise();
      const deepFilter = ctx.createBiquadFilter();
      deepFilter.type = 'lowpass';
      deepFilter.frequency.value = 200;
      const deepVol = ctx.createGain();
      deepVol.gain.value = 0.1;
      deepNoise.connect(deepFilter);
      deepFilter.connect(deepVol);
      deepVol.connect(master);
      deepNoise.start();
      this.activeSources.push(deepNoise);
      this.activeNodes.push(deepFilter, deepVol);

      this.birdInterval = window.setInterval(() => {
        if (Math.random() > 0.4) {
          const initPan = Math.random() * 1.6 - 0.8;
          const initFreq = 1500 + Math.random() * 1400;
          this.chirp(initFreq, initPan, false);
        }
      }, 4500);
    }
  }

  public setType(type: AmbientType): void {
    if (this.currentType === type) return;
    this.currentType = type;
    if (this.playing) {
      this.buildSoundscape(type);
    }
  }

  public play(type?: AmbientType): void {
    if (type) this.currentType = type;
    if (!this.ensureContext() || !this.ctx || !this.master) return;

    // Cancel any pending stop() cleanup so quick stop->play never kills fresh audio
    if (this.stopClearTimeout !== null) {
      window.clearTimeout(this.stopClearTimeout);
      this.stopClearTimeout = null;
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    this.playing = true;
    this.buildSoundscape(this.currentType);

    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(0.45, now, 0.8);
  }

  public stop(): void {
    this.playing = false;
    if (!this.ctx || !this.master) {
      this.clearNodes();
      return;
    }

    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(0, now, 0.25);

    if (this.stopClearTimeout !== null) {
      window.clearTimeout(this.stopClearTimeout);
    }
    this.stopClearTimeout = window.setTimeout(() => {
      this.stopClearTimeout = null;
      if (!this.playing) {
        this.clearNodes();
      }
    }, 500);
  }
}

export const audioEngine = new AmbientAudioEngine();
