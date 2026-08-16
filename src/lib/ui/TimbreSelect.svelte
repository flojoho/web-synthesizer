<script lang=ts>
  import Timbre, { setTimbre } from '../timbre.svelte.js';
</script>

<select
  bind:value={Timbre.state}
  onchange={e => setTimbre(e.currentTarget.value as OscillatorType)}
>
  <option value="square">square</option>
  <option value="sawtooth">sawtooth</option>
  <option value="triangle">triangle</option>
  <option value="sine">sine</option>
</select>

<style>

</style>
