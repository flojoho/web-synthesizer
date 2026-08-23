<script lang=ts>
  import { Note } from '../note.js';
  interface Props {
    x: number,
    y: number,
    noteNumber: number,
    diameter: number,
    spacing: number,
    highlighted: boolean
  }

  let { x, y, noteNumber, diameter, spacing, highlighted }: Props = $props();

  let note: Note | null = null;
  let xTouchStart: number;

  const onTouchstart = (e: TouchEvent) => {
    if(note) return;

    xTouchStart = e.targetTouches[0].clientX;
    
    note = new Note(noteNumber);
    note.start();

    highlighted = true;
  };

  const onTouchmove = (e: TouchEvent) => {
    const xMouse = e.targetTouches[0].clientX

    const pitchChange = (xMouse - xTouchStart) / (diameter + spacing);
    note?.changePitch(pitchChange);

    (e.currentTarget as HTMLElement).style.left = `${ x + (xMouse - xTouchStart) }px`;
  };

  const onTouchend = (e: TouchEvent) => {
    note?.stop();
    note = null;

    (e.currentTarget as HTMLElement).style.left = `${ x }px`;

    highlighted = false;
  };
</script>

<div
  class="note-button"
  class:note-button-active={highlighted}
  ontouchstart={onTouchstart}
  ontouchmove={onTouchmove}
  ontouchend={onTouchend}
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
    z-index: auto;
    touch-action: none;
  }
  .note-button-circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .note-button-active {
    opacity: 1 !important;
    z-index: 1;
  }
</style>
