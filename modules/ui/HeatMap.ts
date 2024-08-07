
const canvas = document.getElementById('heat-map') as HTMLCanvasElement;
const buttonGridContainer = document.getElementById('button-grid-container') as HTMLDivElement;

const ctx = canvas.getContext('2d')!;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const radius = 10;

const { width, height } = canvas;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, width, height);

setInterval(() => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.0075)';
  ctx.fillRect(0, 0, width, height);

  ctx.filter = 'blur(0.4px)';

  ctx.drawImage(canvas, 0, 0);

  ctx.filter = 'none';
}, 100);

let prevX = 0;
let prevY = 0;

buttonGridContainer.addEventListener('touchstart', e => {
  e.preventDefault();

  const x = e.targetTouches[0].clientX;
  const y = e.targetTouches[0].clientY;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'white';
  ctx.fill();

  prevX = x;
  prevY = y;
});

buttonGridContainer.addEventListener('touchmove', e => {
  e.preventDefault();

  const x = e.targetTouches[0].clientX;
  const y = e.targetTouches[0].clientY;

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2 * radius;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, prevY);
  ctx.stroke();

  prevX = x;
});