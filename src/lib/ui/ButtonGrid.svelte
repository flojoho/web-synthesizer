<script lang=ts>
  import settings from '../settings.js';
  import NoteButton from './NoteButton.svelte';
  import { NoteButtonDto, addToHighlightGroup, get, set } from '../buttonGridDtos.svelte.js';

  let buttonGridContainer = $state<HTMLDivElement | null>(null);

  let diameter = settings.get('buttonSize');
  let spacing = settings.get('spacingSize');

  $effect(() => {
    if (buttonGridContainer) {
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

          addToHighlightGroup(noteButtonDto);
        }
      }

      set(gridElements);
    }
  });







  
</script>

<main>
  <canvas id="heat-map"></canvas>
  <div bind:this={buttonGridContainer} class="container">
    {#each get() as noteButtonDto}
      <div>
        <NoteButton
          x={noteButtonDto.x}
          y={noteButtonDto.y}
          noteNumber={noteButtonDto.noteNumber}
          highlighted={noteButtonDto.highlighted}
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
