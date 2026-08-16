import AudioHandler from './audioHandler.js';
import Timbre from './timbre.svelte';

const gainBalanceFactors: Record<OscillatorType, number> = {
  square: 1,
  sawtooth: 1.5,
  triangle: 2.5,
  sine: 2,
  custom: 1
};

export class Note {
  private noteNumber;
  private oscillator!: OscillatorNode;
  private fadeInDuration = 0.005;
  private fadeOutDuration = 0.08;
  private gainNode!: GainNode;
  private oscillatorType: OscillatorType = Timbre.state;
  
  constructor(noteNumber: number) {
    this.noteNumber = noteNumber;
  }

  public start() {
    this.gainNode = AudioHandler.getContext().createGain();
    this.addOscillator();
  }

  public stop() {
    this.removeOscillator();
  }

  public changePitch(offset: number) {
    const now = AudioHandler.getContext().currentTime;
    const frequency = frequencyFromNoteNumber(this.noteNumber + offset);
    this.oscillator.frequency.setValueAtTime(frequency, now);
  }

  private addOscillator() {
    const frequency = frequencyFromNoteNumber(this.noteNumber);
    
    const note = {};
    this.oscillator = AudioHandler.getContext().createOscillator();
    this.oscillator.frequency.setValueAtTime(frequency, AudioHandler.getContext().currentTime);
    this.oscillator.type = this.oscillatorType;

    this.oscillator.connect(this.gainNode);
    
    AudioHandler.connectAudioNode(this.gainNode);

    this.oscillator.start();

    const now = AudioHandler.getContext().currentTime;
    this.gainNode.gain.setValueAtTime(0, now);
    this.gainNode.gain.linearRampToValueAtTime(gainBalanceFactors[this.oscillatorType], now + this.fadeInDuration);
  }

  private removeOscillator() {
    const now = AudioHandler.getContext().currentTime;
    this.gainNode.gain.setValueAtTime(gainBalanceFactors[this.oscillatorType], now);
    this.gainNode.gain.linearRampToValueAtTime(0, now + this.fadeOutDuration);
    this.oscillator.stop(now + this.fadeOutDuration);
  }
}

const frequencyFromNoteNumber = (noteNumber: number) => {
  return 440 * 2**(noteNumber / 12);
}
