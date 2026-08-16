import settings from './settings.js';

let timbre = $state({
  state: settings.get('timbre')
});

const oscillatorTypes: OscillatorType[] = [
  'square',
  'sawtooth',
  'triangle',
  'sine'
];

const initialIndex = oscillatorTypes.indexOf(timbre.state);

let currentIndex = initialIndex >= 0 ? initialIndex : 0;

export const setTimbre = (newTimbre: OscillatorType) => {
  timbre.state = newTimbre;
  settings.set('timbre', newTimbre);
  currentIndex = oscillatorTypes.indexOf(newTimbre);
}

export const nextTimbre = () => {
  if(currentIndex >= oscillatorTypes.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  timbre.state = oscillatorTypes[currentIndex];
  settings.set('timbre', timbre.state);
}

export default timbre;
