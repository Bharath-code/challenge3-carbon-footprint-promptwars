// Web Audio API Synthesizer - Tactile Audio Feedback
// Completely zero-dependency; synthesizes mechanical sounds dynamically

let audioCtx: AudioContext | null = null;
let isSoundEnabled = true;

/**
 * Enable or disable audio feedback globally
 */
export function toggleSound(enabled: boolean) {
  isSoundEnabled = enabled;
}

/**
 * Query current global sound settings
 */
export function getSoundStatus() {
  return isSoundEnabled;
}

/**
 * Safely initializes/resumes browser AudioContext on user interaction
 */
function initAudio(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a mechanical click-clack sound (for buttons and switches)
 */
export function playClick() {
  if (!isSoundEnabled) return;
  try {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.02);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.02);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    console.warn('Audio click synth failed:', e);
  }
}

/**
 * Plays a rapid high-frequency print head pulse tick
 */
export function playPrintTick() {
  if (!isSoundEnabled) return;
  try {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, ctx.currentTime);
    osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.008);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.012);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.02);
  } catch (e) {
    console.warn('Audio print synth failed:', e);
  }
}

/**
 * Plays an ascending double chime for terminal boot or calculations execution
 */
export function playTerminalBoot() {
  if (!isSoundEnabled) return;
  try {
    const ctx = initAudio();
    const now = ctx.currentTime;
    
    // First chime node
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(650, now);
    osc1.frequency.exponentialRampToValueAtTime(1300, now + 0.12);
    gain1.gain.setValueAtTime(0.1, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    osc1.start();
    osc1.stop(now + 0.15);
    
    // Second delayed offset chime node
    setTimeout(() => {
      if (!isSoundEnabled || !audioCtx) return;
      try {
        const now2 = audioCtx.currentTime;
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(850, now2);
        osc2.frequency.exponentialRampToValueAtTime(1700, now2 + 0.12);
        gain2.gain.setValueAtTime(0.08, now2);
        gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.12);
        
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        
        osc2.start();
        osc2.stop(now2 + 0.15);
      } catch {
        // fail silently
      }
    }, 50);
  } catch (e) {
    console.warn('Audio boot synth failed:', e);
  }
}
