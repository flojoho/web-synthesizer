<script lang=ts>
  /*import { setDiameter, setSpacing } from "./NoteButton.js";
  import ButtonGrid from './ButtonGrid.js';
  import settings from '../settings.js';

  const modal = document.getElementById('modal') as HTMLDivElement;
  const settingsButton = document.getElementById('settings-button') as HTMLButtonElement;
  const closeButton = document.getElementById('close-button') as HTMLButtonElement;
  const buttonSizeSlider = document.getElementById('button-size-slider') as HTMLInputElement;
  const spacingSizeSlider = document.getElementById('spacing-size-slider') as HTMLInputElement;

  buttonSizeSlider.value = settings.get('buttonSize');
  spacingSizeSlider.value = settings.get('spacingSize');

  const toggleModal = () => {
    modal.classList.toggle('hidden');
  }

  settingsButton.addEventListener('click', toggleModal);
  closeButton.addEventListener('click', toggleModal);

  buttonSizeSlider

  buttonSizeSlider.addEventListener('input', () => {
    const buttonSize = Number.parseFloat(buttonSizeSlider.value);
    setDiameter(buttonSize);
    ButtonGrid.render();
    settings.set('buttonSize', buttonSize);
  });

  spacingSizeSlider.addEventListener('input', () => {
    const spacingSize = Number.parseFloat(spacingSizeSlider.value);
    setSpacing(spacingSize);
    ButtonGrid.render();
    settings.set('spacingSize', spacingSize);
  });*/
</script>

<aside id="modal" class="hidden">
  <div>
    <span id="close-button">×</span>
    <div>
      <label for="button-size-slider">button size</label>
      <input type="range" id="button-size-slider" min="50" max="150" value="85">
    </div>
    <div>
      <label for="spacing-size-slider">space between buttons</label>
      <input type="range" id="spacing-size-slider" min="0" max="30" value="5">
    </div>
  </div>
</aside>

<style>

  input {
    width: 160px;
  }

  label {
    display: block;
    margin-bottom: 4px;
  }

  aside {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  aside>div {
    background-color: rgba(255,255,255,0.8);
    width: 100%;
    max-width: 600px;
    border-radius: 12px;
    padding: 0 42px;
    color: var(--black);
    filter: drop-shadow(0 0 0.75rem rgba(0,0,0,0.3));
    backdrop-filter: blur(12px);
  }
  aside>div>div {
    margin: 42px 0;
  }

  #close-button {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 32px;
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hidden {
    display: none;
  }
</style>
