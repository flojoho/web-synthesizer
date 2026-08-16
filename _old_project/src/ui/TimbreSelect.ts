import settings from '../settings.js';

const timbreSelect = document.getElementById('timbreSelect') as HTMLSelectElement;

timbreSelect.value = settings.get('timbre');

timbreSelect.addEventListener('change', () => settings.set('timbre', timbreSelect.value));

class TimbreSelect {
  public oscillatorType: OscillatorType = timbreSelect.value as OscillatorType;

  changeTimbre() {
    if(timbreSelect.selectedIndex === timbreSelect.length - 1) {
      timbreSelect.selectedIndex = 0;
    } else {
      timbreSelect.selectedIndex++;
    }
    settings.set('timbre', timbreSelect.value);
  }
}

const singleton = new TimbreSelect();

export default singleton;
