import { Note } from './AudioHandler.js';

export const diameter = 85;
const spacing = 5;

class NoteButton {
  #div
  #noteNumber
  #x
  #xTouchStart
  #note
  
  constructor(noteNumber, x, y) {
    this.#noteNumber = noteNumber;
    this.#x = x;

    const circle = document.createElement('div');
    circle.classList.add('note-button');
    circle.style.backgroundColor = `hsl(${ noteNumber / 12 * 360 }, 100%, 50%)`;
    circle.style.width = `${ diameter - spacing }px`;
    circle.style.height = `${ diameter - spacing }px`;

    this.#div = document.createElement('div');
    this.#div.appendChild(circle);
    this.#div.style.position = `absolute`;
    this.#div.style.display = `flex`;
    this.#div.style.width = `${ diameter }px`;
    this.#div.style.height = `${ diameter }px`;
    this.#div.style.left = `${ x }px`;
    this.#div.style.top = `${ y }px`;

    this.#div.addEventListener('touchstart', e => {
      e.preventDefault();
      if(this.#note) return;

      this.#xTouchStart = e.targetTouches[0].clientX;
      
      this.#note = new Note(this.#noteNumber);
      this.#note.start();

      this.#div.classList.add('note-button-active');
    });

    this.#div.addEventListener('touchmove', e => {
      e.preventDefault();

      const xMouse = e.targetTouches[0].clientX

      const pitchChange = (xMouse - this.#xTouchStart) / diameter;
      this.#note.changePitch(pitchChange);

      this.#div.style.left = `${ this.#x + (xMouse - this.#xTouchStart) }px`;
    });

    this.#div.addEventListener('touchend', e => {
      e.preventDefault();
      
      this.#note.stop();
      this.#note = undefined;

      this.#div.classList.remove('note-button-active');

      this.#div.style.left = `${ this.#x }px`;
    });
  }

  appendTo(parent) {
    parent.appendChild(this.#div);
  }
}

export default NoteButton;
