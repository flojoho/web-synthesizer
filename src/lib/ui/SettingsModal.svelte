<script lang=ts>
  import settings from "../settings";
  
  type Props = {
    buttonGridDiameter: number,
    buttonGridSpacing: number,
    hidden: boolean
  }
  let { buttonGridDiameter = $bindable(), buttonGridSpacing = $bindable(), hidden = $bindable() }: Props = $props();

  const toggleModal = () => {
    hidden = true;
  }

  const buttonSizeSliderOnInput = (e: Event) => {
    const buttonSize = Number.parseFloat((e.target as HTMLInputElement).value);
    buttonGridDiameter = buttonSize;
    settings.set('buttonSize', buttonSize);
  };

  const spacingSizeSliderOnInput = (e: Event) => {
    const spacingSize = Number.parseFloat((e.target as HTMLInputElement).value);
    buttonGridSpacing = spacingSize;
    settings.set('spacingSize', spacingSize);
  };
</script>

<aside id="modal" class:hidden={hidden}>
  <div>
    <span id="close-button" onclick={toggleModal}>×</span>
    <div>
      <label for="button-size-slider">button size</label>
      <input type="range" oninput={buttonSizeSliderOnInput} min="50" max="150" bind:value={buttonGridDiameter}>
    </div>
    <div>
      <label for="spacing-size-slider">space between buttons</label>
      <input type="range" oninput={spacingSizeSliderOnInput} id="spacing-size-slider" min="0" max="30" bind:value={buttonGridSpacing}>
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
