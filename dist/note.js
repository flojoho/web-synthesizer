import AudioHandler from './audioHandler.js';
import TimbreSelect from './ui/TimbreSelect.js';
const gainBalanceFactors = {
    square: 1,
    sawtooth: 1.5,
    triangle: 2.5,
    sine: 2,
    custom: 1
};
export class Note {
    constructor(noteNumber) {
        this.fadeInDuration = 0.005;
        this.fadeOutDuration = 0.08;
        this.oscillatorType = TimbreSelect.oscillatorType;
        this.noteNumber = noteNumber;
    }
    start() {
        this.gainNode = AudioHandler.getContext().createGain();
        this.addOscillator();
    }
    stop() {
        this.removeOscillator();
    }
    changePitch(offset) {
        const now = AudioHandler.getContext().currentTime;
        const frequency = frequencyFromNoteNumber(this.noteNumber + offset);
        this.oscillator.frequency.setValueAtTime(frequency, now);
    }
    addOscillator() {
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
    removeOscillator() {
        const now = AudioHandler.getContext().currentTime;
        this.gainNode.gain.setValueAtTime(gainBalanceFactors[this.oscillatorType], now);
        this.gainNode.gain.linearRampToValueAtTime(0, now + this.fadeOutDuration);
        this.oscillator.stop(now + this.fadeOutDuration);
    }
}
const frequencyFromNoteNumber = (noteNumber) => {
    return 440 * 2 ** (noteNumber / 12);
};
//# sourceMappingURL=note.js.map