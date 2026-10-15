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

export const toggleGlobalAudio = () => {
  isAudioEnabled = !isAudioEnabled;
  if (isAudioEnabled) initAudio();
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

// 🔊 Synthesized High-Tech UI Tick
export const playHoverTick = () => {
  if (!isAudioEnabled || !audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.03);

  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.03);
};

// 🔊 Synthesized Mechanical Keyboard Clack
export const playTypingClack = () => {
  if (!isAudioEnabled || !audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'triangle';
  // Randomize pitch slightly for organic mechanical feel
  const pitch = 200 + Math.random() * 40;
  osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.04);

  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.04);
};