<script lang=ts>
  import Volume, { setVolume } from '../volume.svelte.js';
</script>

<input
  type="range"
  id="volumeSlider"
  min="0"
  max="100"
  bind:value={Volume.state}
  onchange={e => setVolume(parseFloat(e.currentTarget.value))}
/>

<style>

</style>
