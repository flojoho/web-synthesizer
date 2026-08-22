<script lang="ts">
  import './index.js';
  import TimbreSelect from './ui/TimbreSelect.svelte';
  import VolumeSelect from './ui/VolumeSelect.svelte';
  import ButtonGrid from './ui/ButtonGrid.svelte';
  import SettingsModal from './ui/SettingsModal.svelte';
  import settings from './settings.js';

  let buttonGridDiameter = $state(settings.get('buttonSize'));
  let buttonGridSpacing = $state(settings.get('spacingSize'));

  let isSettingsModalHidden = $state(true);

  const showSettingsModal = () => {
    isSettingsModalHidden = false;
  }
</script>

<ButtonGrid diameter={buttonGridDiameter} spacing={buttonGridSpacing} />
<footer>
  <div>
    <div>
      <VolumeSelect />
    </div>
  </div>
  <div class="flex-stretch">
    <div>
      <TimbreSelect />
    </div>
  </div>
  <div>
    <button id="settings-button" onclick={showSettingsModal}>•••</button>
  </div>
</footer>
<SettingsModal bind:buttonGridDiameter bind:buttonGridSpacing bind:hidden={isSettingsModalHidden} />

<style>
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

  .flex-stretch {
    flex: 1;
  }
</style>
