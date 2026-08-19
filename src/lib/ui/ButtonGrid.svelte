<script lang=ts>
  import settings from '../settings.js';
  import NoteButton from './NoteButton.svelte';

  class NoteButtonDto {
    public x: number;
    public y: number;
    public noteNumber: number;
    
    constructor(noteNumber: number, x: number, y: number) {
      this.noteNumber = noteNumber;
      this.x = x;
      this.y = y;
    }
  }

  let buttonGridContainer = $state<HTMLDivElement | null>(null);
  let noteButtonDtos = $state<NoteButtonDto[]>([]);

  let diameter = settings.get('buttonSize');
  let spacing = settings.get('spacingSize');

  const noteButtonGroups: (NoteButtonDto[])[] = [];

  const addToNoteButtonGroup = (noteButtonDto: NoteButtonDto) => {
    const { noteNumber } = noteButtonDto;

    if(typeof noteButtonGroups[noteNumber] === 'undefined') {
      noteButtonGroups[noteNumber] = []
    }

    noteButtonGroups[noteNumber].push(noteButtonDto);
  }

  $effect(() => {
    console.log('EFFECT RUN', buttonGridContainer);
    
    if (buttonGridContainer) {
      console.log(
    'dimensions:',
    buttonGridContainer.offsetWidth,
    buttonGridContainer.offsetHeight
  );
      const divWidth = buttonGridContainer.offsetWidth;
      const divHeight = buttonGridContainer.offsetHeight;

      const tileSize = diameter + spacing;

      const buttonsPerRow = Math.floor(divWidth / tileSize);
      const buttonsPerColumn = Math.floor(divHeight / tileSize);
      
      const marginX = (divWidth - (buttonsPerRow * tileSize)) / 2;
      const marginY = (divHeight - (buttonsPerColumn * tileSize)) / 2;

      const gridElements: NoteButtonDto[] = [];

      for (let countY = 0; countY < buttonsPerColumn; countY++) {
        for(let countX = 0; countX < buttonsPerRow; countX++) {
          const x = marginX + countX * tileSize;
          const y = marginY + countY * tileSize;

          const noteNumber = countX - (Math.floor(buttonsPerRow / 2)) - 5 * (countY - Math.floor(buttonsPerColumn / 2));
          const noteButtonDto = new NoteButtonDto(noteNumber, x, y);

          gridElements.push(noteButtonDto);

          addToNoteButtonGroup(noteButtonDto);
        }
      }

      noteButtonDtos = gridElements;
    }
  });

  /*const enableHighlight = (noteNumber: number) => {
    noteButtonGroups[noteNumber]?.forEach(noteButton => noteButton.enableHighlight());
  }

  const disableHighlight = (noteNumber: number) => {
    noteButtonGroups[noteNumber]?.forEach(noteButton => noteButton.disableHighlight());
  }*/







  
</script>

<main>
  <canvas id="heat-map"></canvas>
  <div bind:this={buttonGridContainer} class="container">
    {#each noteButtonDtos as noteButtonDto}
      <div>
        <NoteButton
          x={noteButtonDto.x}
          y={noteButtonDto.y}
          noteNumber={noteButtonDto.noteNumber}
          {diameter}
          {spacing}
        />
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    flex: 1;
    position: relative;
  }

  .container {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  #heat-map {
    width: 100%;
    height: 100%;
    opacity: 0.4;
    position: absolute;
  }
</style>
