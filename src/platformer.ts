const canvas = document.getElementById("platformerCanvas");

if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Element is not a canvas");
}

const ctx = canvas.getContext("2d");

if (!ctx) {
    throw new Error("Failed to get 2D context");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// we want to respect the size of the window
function handleResize() {
}
  
window.addEventListener('resize', handleResize);

ctx.fillStyle = "black";
ctx.font = `50px Courier New`;
const helloWorld = `Hello World!`;
ctx.strokeText(helloWorld, 10, 50);
