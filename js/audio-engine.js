/**
 * Herencia Pinolera - Audio Engine & Sound Synthesis
 * Supports:
 * - Multilingual Voice Narrator (Web Speech API + Phonetic fallback)
 * - Web Audio API procedural sound effects (Alerts, Stamps, Chimes)
 * - Real-time Audio Recorder Simulator with Canvas Audio Equalizer
 */

class HPAudioEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.audioCtx = null;
    this.isRecording = false;
    this.recordTimer = null;
    this.recordSeconds = 0;
    this.isMuted = false;
    this.currentLanguage = 'es';
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported in this browser environment", e);
    }
  }

  ensureAudioContext() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
  }

  // Synthesize and speak text according to current language
  speak(text, lang = this.currentLanguage) {
    if (this.isMuted) return;

    if (this.synth) {
      this.synth.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Select appropriate voice locale
      if (lang === 'es') {
        utterance.lang = 'es-NI';
        utterance.rate = 0.95;
      } else if (lang === 'kr') {
        utterance.lang = 'en-US'; // Closest approximation for Kriol English
        utterance.rate = 0.9;
      } else {
        // Miskitu / Mayangna: speak with gentle rate
        utterance.lang = 'es-MX';
        utterance.rate = 0.88;
        utterance.pitch = 1.05;
      }

      utterance.onstart = () => {
        document.body.classList.add('audio-speaking');
        this.showAudioToast(`🔊 Reproduciendo: "${text.substring(0, 45)}..."`);
      };

      utterance.onend = () => {
        document.body.classList.remove('audio-speaking');
      };

      this.synth.speak(utterance);
    } else {
      this.showAudioToast(`🔊 (Audio): ${text}`);
      this.playSuccessChime();
    }
  }

  // Show a non-intrusive floating toast when audio is played
  showAudioToast(message) {
    let toast = document.getElementById('hp-audio-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'hp-audio-toast';
      toast.className = 'hp-audio-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="toast-icon">📢</span> <span>${message}</span>`;
    toast.classList.add('visible');
    
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, 4000);
  }

  // Pure Web Audio procedural sounds (no external MP3 files needed)
  playClickSound() {
    this.ensureAudioContext();
    if (!this.audioCtx || this.isMuted) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }

  // Success chime for completed tasks / passports / sales
  playSuccessChime() {
    this.ensureAudioContext();
    if (!this.audioCtx || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const startTime = this.audioCtx.currentTime + (idx * 0.08);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }

  // Notification bell for master artisan when youth registers
  playArtisanAlert() {
    this.ensureAudioContext();
    if (!this.audioCtx || this.isMuted) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.35);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  // Ancestral Council of Elders digital stamp sound
  playCouncilStamp() {
    this.ensureAudioContext();
    if (!this.audioCtx || this.isMuted) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Audio Recorder Simulator with live oscilloscope animation
  startSimulatorRecording(canvasElement, timerElement, onFinish) {
    this.isRecording = true;
    this.recordSeconds = 0;
    this.playClickSound();

    if (timerElement) {
      timerElement.textContent = "00:00 (Grabando...)";
      this.recordTimer = setInterval(() => {
        this.recordSeconds++;
        const mins = String(Math.floor(this.recordSeconds / 60)).padStart(2, '0');
        const secs = String(this.recordSeconds % 60).padStart(2, '0');
        timerElement.textContent = `${mins}:${secs} (Grabando...)`;
      }, 1000);
    }

    // Oscilloscope visualizer on canvas
    if (canvasElement) {
      const ctx = canvasElement.getContext('2d');
      const drawVisualizer = () => {
        if (!this.isRecording) return;
        const width = canvasElement.width;
        const height = canvasElement.height;

        ctx.fillStyle = 'rgba(23, 28, 38, 0.4)';
        ctx.fillRect(0, 0, width, height);

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#D97706'; // Terracotta gold
        ctx.beginPath();

        const sliceWidth = width / 40;
        let x = 0;

        for (let i = 0; i < 40; i++) {
          const v = Math.sin(Date.now() * 0.008 + i * 0.4) * Math.random() * 0.8 + 0.2;
          const y = (v * height) / 2 + height / 4;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.stroke();
        requestAnimationFrame(drawVisualizer);
      };
      drawVisualizer();
    }
  }

  stopSimulatorRecording(timerElement) {
    this.isRecording = false;
    clearInterval(this.recordTimer);
    if (timerElement) {
      const mins = String(Math.floor(this.recordSeconds / 60)).padStart(2, '0');
      const secs = String(this.recordSeconds % 60).padStart(2, '0');
      timerElement.textContent = `${mins}:${secs} (Grabación completada ✅)`;
    }
    this.playSuccessChime();
    return {
      duration: `${this.recordSeconds} segundos`,
      recordedAt: new Date().toLocaleTimeString(),
      sampleUrl: "audio/recorded_sample.ogg"
    };
  }
}

// Global instance
window.hpAudio = new HPAudioEngine();
