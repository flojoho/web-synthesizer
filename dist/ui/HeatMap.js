const canvas = document.getElementById('heat-map');
const buttonGridContainer = document.getElementById('button-grid-container');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const radius = 10;
const { width, height } = canvas;
class HeatMap {
    clear() {
        ctx.clearRect(0, 0, width, height);
    }
    darkenAndBlur() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
        ctx.fillRect(0, 0, width, height);
        ctx.filter = 'blur(0.4px)';
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none';
    }
    drawCircle(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}
const heatMap = new HeatMap();
heatMap.clear();
setInterval(heatMap.darkenAndBlur, 100);
buttonGridContainer.addEventListener('touchstart', e => {
    e.preventDefault();
    const x = e.targetTouches[0].clientX;
    const y = e.targetTouches[0].clientY;
    heatMap.drawCircle(x, y);
});
export default heatMap;
//# sourceMappingURL=HeatMap.js.map