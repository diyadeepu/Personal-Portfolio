import { useState, useEffect } from 'react';

// Global shared state
let isAudioEnabled = false;
let audioCtx = null;
let stateListeners = [];

const notifyListeners = () => {
  stateListeners.forEach(listener => listener(isAudioEnabled));
};

export const initAudio = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

// 🔊 Power-up chime to confirm it's working when toggled on
const playPowerUp = () => {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, t);
  osc.frequency.linearRampToValueAtTime(800, t + 0.1);

  gainNode.gain.setValueAtTime(0, t);
  gainNode.gain.linearRampToValueAtTime(0.2, t + 0.05);
  gainNode.gain.linearRampToValueAtTime(0, t + 0.15);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.15);
};

export const toggleGlobalAudio = () => {
  isAudioEnabled = !isAudioEnabled;
  if (isAudioEnabled) {
    initAudio();
    // Play a confirmation sound instantly so you know it works
    setTimeout(playPowerUp, 50);
  }
  notifyListeners();
};

// Custom hook to use the toggle in any component
export const useAudioState = () => {
  const [enabled, setEnabled] = useState(isAudioEnabled);

  useEffect(() => {
    stateListeners.push(setEnabled);
    return () => {
      stateListeners = stateListeners.filter(l => l !== setEnabled);
    };
  }, []);

  return { isAudioEnabled: enabled, toggleGlobalAudio };
};

// 🔊 Synthesized High-Tech UI Tick (Louder and safer math)
export const playHoverTick = () => {
  if (!isAudioEnabled || !audioCtx) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, t);
  osc.frequency.linearRampToValueAtTime(300, t + 0.05);

  gainNode.gain.setValueAtTime(0.2, t);
  gainNode.gain.linearRampToValueAtTime(0, t + 0.05);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.05);
};

// 🔊 Synthesized Mechanical Keyboard Clack (Louder and safer math)
export const playTypingClack = () => {
  if (!isAudioEnabled || !audioCtx) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'square';
  const pitch = 250 + Math.random() * 50; // Randomize pitch for mechanical feel
  osc.frequency.setValueAtTime(pitch, t);

  gainNode.gain.setValueAtTime(0.15, t);
  gainNode.gain.linearRampToValueAtTime(0, t + 0.05);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.05);
};