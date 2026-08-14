import settings from './settings.js';
const volumeSlider = document.getElementById('volumeSlider');
const initialVolume = settings.get('volume');
if (!isNaN(initialVolume)) {
    volumeSlider.value = initialVolume;
}
const maxGain = 0.2;
const volume = initialVolume;
let context;
let volumeNode;
const ensureAudioSetup = () => {
    if (!context) {
        context = new AudioContext();
        volumeNode = context.createGain();
        volumeNode.gain.value = volume / 100 * maxGain;
        volumeNode.connect(context.destination);
    }
};
const stopAllNotes = () => {
    ensureAudioSetup();
};
const setVolume = (percentage) => {
    ensureAudioSetup();
    // TODO: should i use a number between 0 and 1 instead of percentages?
    volumeNode.gain.value = percentage / 100 * maxGain;
    settings.set('volume', percentage);
};
export const connectAudioNode = (node) => {
    ensureAudioSetup();
    node.connect(volumeNode);
};
export const getContext = () => {
    ensureAudioSetup();
    return context;
};
export default { stopAllNotes, setVolume, connectAudioNode, getContext };
//# sourceMappingURL=audioHandler.js.map