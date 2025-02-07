// we need to store some state
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var targetX = windowWidth / 2;
var targetY = windowHeight / 2;

const blockSize = 30;


// we need to setup the canvas
const canvas = document.getElementById("platformerCanvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// lets draw our character

ctx.beginPath();
ctx.rect(targetX, targetY, blockSize, blockSize * 2);
ctx.fillStyle = "grey";
ctx.fill();
