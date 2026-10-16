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

// 🔊 Softened Power-up Chime
const playPowerUp = () => {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, t);
  osc.frequency.linearRampToValueAtTime(600, t + 0.1);

  gainNode.gain.setValueAtTime(0, t);
  gainNode.gain.linearRampToValueAtTime(0.1, t + 0.05);
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
    setTimeout(playPowerUp, 50);
  }
  notifyListeners();
};

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

export const playHoverTick = () => {
  if (!isAudioEnabled || !audioCtx) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, t);
  osc.frequency.linearRampToValueAtTime(300, t + 0.05);

  gainNode.gain.setValueAtTime(0.1, t);
  gainNode.gain.linearRampToValueAtTime(0, t + 0.05);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.05);
};

// 🔊 NEW: Authentic Mechanical Keyboard "Thock" (White Noise + Bandpass Filter)
export const playTypingClack = () => {
  if (!isAudioEnabled || !audioCtx) return;
  const t = audioCtx.currentTime;

  // 1. Create a 50ms burst of white noise
  const bufferSize = audioCtx.sampleRate * 0.05;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  // 2. Filter it to sound like plastic hitting a switch
  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 800 + Math.random() * 400; // Randomize pitch slightly

  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.3, t); // Volume spike
  gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.03); // Fast decay

  noise.connect(bandpass);
  bandpass.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  noise.start(t);
};