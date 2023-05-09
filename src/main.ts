import Effect from "./utils/Effect";

const canvas = document.getElementById("app-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "white";
ctx.strokeStyle = "white";
ctx.lineWidth = 1;

const effect = new Effect(canvas);
console.log(effect);

function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height)
  effect.render(ctx);
  // effect.drawGrid(ctx);
  requestAnimationFrame(animate)
}
animate();