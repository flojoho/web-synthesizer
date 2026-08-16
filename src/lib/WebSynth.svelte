<script lang="ts">
  import './index.js';
  import TimbreSelect from './ui/TimbreSelect.svelte';
</script>

<main>
  <canvas id="heat-map"></canvas>
  <div id="button-grid-container"></div>
</main>
<footer>
  <div>
    <div>
      <input type="range" id="volumeSlider" min="0" max="100" value="100">
    </div>
  </div>
  <div class="flex-stretch">
    <div>
      <TimbreSelect />
    </div>
  </div>
  <div>
    <button id="settings-button">•••</button>
  </div>
</footer>
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
  body {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh;
    background-color: var(--black);
    color: var(--white);
    overscroll-behavior: contain; /* disable pull to refresh */
  }

  footer {
    width: 100%;
    background-color: var(--dark-gray);
    padding: 16px 0;
    display: flex;
    align-items: center;
    overflow: auto;
  }
  footer>div {
    margin: 0 16px 0 24px;
  }

  main {
    flex: 1;
    position: relative;
  }



  input {
    width: 160px;
  }

  label {
    display: block;
    margin-bottom: 4px;
  }

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

  #settings-button {
    border: none;
    background-color: var(--gray);
    color: var(--white);
    font-size: 0.8rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hidden {
    display: none;
  }

  .flex-stretch {
    flex: 1;
  }

  #button-grid-container {
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
