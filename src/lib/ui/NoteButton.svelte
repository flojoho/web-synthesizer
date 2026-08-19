<script lang=ts>
  import { Note } from '../note.js';
  interface Props {
    x: number,
    y: number,
    noteNumber: number,
    diameter: number,
    spacing: number
  }

  let { x, y, noteNumber, diameter, spacing }: Props = $props();

  class NoteButton {
    private div;
    private x: number;
    private xTouchStart: number = 0;
    private note?: Note;
    public noteNumber: number;
    private diameter: number;
    private spacing: number;
    
    constructor(noteNumber: number, x: number, y: number, diameter: number, spacing: number) {
      this.noteNumber = noteNumber;
      this.x = x;
      this.diameter = diameter;
      this.spacing = spacing;

      const circle = document.createElement('div');
      circle.classList.add('note-button-circle');
      circle.style.backgroundColor = `hsl(${ noteNumber / 12 * 360 }, 100%, 50%)`;
      circle.style.width = `${ this.diameter }px`;
      circle.style.height = `${ this.diameter }px`;

      this.div = document.createElement('div');
      this.div.appendChild(circle);
      this.div.classList.add('note-button');
      this.div.style.width = `${ this.diameter + this.spacing }px`;
      this.div.style.height = `${ this.diameter + this.spacing }px`;
      this.div.style.left = `${ x }px`;
      this.div.style.top = `${ y }px`;

      this.div.addEventListener('touchstart', e => {
        e.preventDefault();
        if(this.note) return;

        this.xTouchStart = e.targetTouches[0].clientX;
        
        this.note = new Note(this.noteNumber);
        this.note.start();

        this.enableHighlight();
      });

      this.div.addEventListener('touchmove', e => {
        e.preventDefault();

        const xMouse = e.targetTouches[0].clientX

        const pitchChange = (xMouse - this.xTouchStart) / (this.diameter + this.spacing);
        this.note?.changePitch(pitchChange);

        this.div.style.left = `${ this.x + (xMouse - this.xTouchStart) }px`;
      });

      this.div.addEventListener('touchend', e => {
        e.preventDefault();
        
        this.note?.stop();
        this.note = undefined;

        this.disableHighlight();

        this.div.style.left = `${ this.x }px`;
      });
    }

    appendTo(parent: HTMLElement) {
      parent.appendChild(this.div);
    }

    enableHighlight() {
      this.div.classList.add('note-button-active');
      this.div.style.zIndex = '1';
    }

    disableHighlight() {
      this.div.classList.remove('note-button-active');
      this.div.style.zIndex = 'auto';
    }
  }
</script>

<div
  class="note-button"
  style={`width: ${ diameter + spacing }px; height: ${ diameter + spacing }px; left: ${ x }px; top: ${ y }px;`}
>
  <div
    class="note-button-circle"
    style={`background-color: hsl(${ noteNumber / 12 * 360 }, 100%, 50%); width: ${ diameter }px; height: ${ diameter }px;`}
  >
  </div>
</div>

<style>
  .note-button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.4;
  }
  .note-button-circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .note-button-active {
    opacity: 1 !important;
  }
</style>
