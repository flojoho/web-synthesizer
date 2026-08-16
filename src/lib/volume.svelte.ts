import settings from './settings.js';

let volume = $state({
  state: settings.get('volume')
});

export const setVolume = (newVolume: number) => {
  volume.state = newVolume;
  settings.set('volume', newVolume);
}

export default volume;
