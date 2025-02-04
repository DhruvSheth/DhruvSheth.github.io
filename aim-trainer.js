// we need to store some state
const targetSize = 25;
const targetColor = "red";

var clickCount = 0;
var targetsClickedCount = 0;

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var targetX = windowWidth / 2;
var targetY = windowHeight / 2;


function initState() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    targetX = windowWidth / 2;
    targetY = windowHeight / 2;
}

// we need to setup the canvas
const canvas = document.getElementById("aimTrainerCanvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// we want to respect the size of the window
function handleResize() {
    initState()
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    displayScore();
    console.log(`New window size: ${width} x ${height}`);
}
  
window.addEventListener('resize', handleResize);

// we want to display how many targets we have clicked
function displayScore() {
    const scoreHorizontalOffset = 10;
    const scoreMaxWidth = windowWidth - (scoreHorizontalOffset* 2)
    const fontSize = 50;
    ctx.fillStyle = "black";
    ctx.font = `${fontSize}px Courier New`;
    var scoreString = `${targetsClickedCount} targets clicked in ${clickCount} clicks`;
    ctx.strokeText  (scoreString, scoreHorizontalOffset, fontSize, scoreMaxWidth);
}

// we need to be able to draw circles as targets
function drawCircle(x, y, size, color) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}


// we want to show a target
function displayTarget() {
    drawCircle(targetX, targetY, targetSize, targetColor);
}

// we want to see if we clicked the target
function didHitTarget(clickX, clickY) {
    return Math.abs(targetX - clickX) < targetSize && Math.abs(targetY - clickY) < targetSize;
}

// we want to be able to move the target within range of window
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function moveTarget() {
    targetX = targetSize + getRandomInt(windowWidth - (targetSize * 2));
    targetY = targetSize + getRandomInt(windowHeight - (targetSize * 2));
}

// we want to handle clicks
function handleClicks(clickX, clickY) {
    clickCount += 1;
    if (didHitTarget(clickX, clickY)) {
        targetsClickedCount += 1;
        moveTarget();
    }
}


// we want to render the trainer
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayTarget();
    displayScore();
}

render()

canvas.addEventListener("click", (event) => {
    handleClicks(event.clientX, event.clientY);
    render();
});
