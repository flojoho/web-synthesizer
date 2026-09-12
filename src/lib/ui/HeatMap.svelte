<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const radius = 10;

  onMount(() => {
    ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const { width, height } = canvas;
    
    const clear = () => {
      ctx.clearRect(0, 0, width, height);
    }

    const darkenAndBlur = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
      ctx.fillRect(0, 0, width, height);

      ctx.filter = 'blur(0.4px)';

      ctx.drawImage(canvas, 0, 0);

      ctx.filter = 'none';
    }

    clear();

    const blurInterval = setInterval(darkenAndBlur, 100);

    return () => {
      clearInterval(blurInterval);
    };
  });

  export const drawCircle = (x: number, y: number) => {
    if(!ctx) return;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
</script>

<canvas bind:this={canvas} id="heat-map" class="heat-map"></canvas>

<style>
  .heat-map {
    width: 100%;
    height: 100%;
    opacity: 0.4;
    position: absolute;
  }
</style>
