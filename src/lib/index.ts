import { noteNumberFromKey, transposeUp, transposeDown } from './keyMapping.js';
import AudioHandler from './audioHandler.js';
import { Note } from './note.js';
import { nextTimbre } from './timbre.svelte.js';
import volume, {setVolume} from './volume.svelte.js';
//import './ui/SettingsModal.js';
//import ButtonGrid from './ui/ButtonGrid.js';
//import HeatMap from './ui/HeatMap.js';

/*ButtonGrid.render();
addEventListener('resize', () => {
  ButtonGrid.render();
  HeatMap.clear();
});*/


type Statistics = {
  volume: number,
  noteNumber: number
}

function incrementStatistics(data: Statistics) {
  let statistics = JSON.parse(localStorage.getItem('statistics') || '{}');

  for(const [key, value] of Object.entries(data)) {
    if(typeof statistics[key] !== 'object') statistics[key] = {};
    if(typeof statistics[key][value] !== 'number') statistics[key][value] = 0;
    statistics[key][value] += 1;
  }
  localStorage.setItem('statistics', JSON.stringify(statistics));
}

type PressedKeys = {
  [Key: string]: boolean
}
const pressedKeys: PressedKeys = {};

type Notes = {
  [Key: string]: Note
}
const notes: Notes = {};

function noteKeyGotPressed(keyCode: string) {
  const noteNumber = noteNumberFromKey(keyCode);
  const note = new Note(noteNumber);
  notes[keyCode] = note;
  note.start();

  //ButtonGrid.enableHighlight(noteNumber);

  incrementStatistics({
    volume: parseFloat(volume.state),
    noteNumber: noteNumber
  });
}

function noteKeyGotReleased(keyCode: string) {
  const noteNumber = noteNumberFromKey(keyCode);
  notes[keyCode]?.stop();

  //ButtonGrid.disableHighlight(noteNumber);
}

//**************************** EVENT HANDLING ************************

document.addEventListener('keydown', e => {
  if(['ArrowUp', 'ArrowDown'].includes(e.code)) {
    const prevVolume = volume.state;
    let nextVolume: number;
    if (e.code === 'ArrowUp') {
      nextVolume = prevVolume + 5;
    } else {
      nextVolume = prevVolume - 5;
    }
    
    if(nextVolume > 100) nextVolume = 100;
    if(nextVolume < 0) nextVolume = 0;
    
    setVolume(nextVolume);
    AudioHandler.setVolume(nextVolume);
    return;
  }
  
  if(['ArrowLeft', 'ArrowRight'].includes(e.code)) {
    if(e.code === 'ArrowLeft') {
      transposeDown();
    }
    if(e.code === 'ArrowRight') {
      transposeUp();
    }
    return;
  }

  if(e.code === 'Space') {
    nextTimbre();
  }
  
  const noteNumber = noteNumberFromKey(e.code);
  if(!Number.isInteger(noteNumber)) return;

  if(pressedKeys[e.code] !== true) {
    pressedKeys[e.code] = true;
    noteKeyGotPressed(e.code);
  }
});

document.addEventListener('keyup', e => {
  const noteNumber = noteNumberFromKey(e.code);
  if(!Number.isInteger(noteNumber)) return;

  if(pressedKeys[e.code] !== false) {
    pressedKeys[e.code] = false;
    noteKeyGotReleased(e.code);
  }
});
