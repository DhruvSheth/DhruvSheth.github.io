"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas = document.getElementById("platformerCanvas");
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Element is not a canvas");
}
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Failed to get 2D context");
}
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let halfWindowHeight = window.innerHeight / 2;
canvas.width = windowWidth;
canvas.height = windowHeight;
const player = {
    momentumX: 0,
    momentumY: 0,
    posX: 60,
    posY: halfWindowHeight,
    width: 30,
    height: 60
};
const platform = {
    height: halfWindowHeight + 60,
    startX: 0,
    endX: windowWidth
};
const endZone = {
    posX: windowWidth - 240,
    posY: halfWindowHeight,
    width: 240,
    height: 120
};
const level = {
    platforms: [platform],
    player,
    endZone
};
let drawLevel = ({ player, endZone, platforms }) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer(player);
    drawEndzone(endZone);
    platforms.forEach((platform) => drawPlatform(platform));
};
let drawPlatform = (platform) => {
    ctx.fillStyle = "black";
    ctx.fillRect(platform.startX, platform.height, platform.endX - platform.startX, 20);
};
let drawPlayer = (player) => {
    ctx.fillStyle = "grey";
    ctx.fillRect(player.posX, player.posY, player.width, player.height);
};
let drawEndzone = (endZone) => {
    ctx.fillStyle = "green";
    ctx.fillRect(endZone.posX, endZone.posY - (endZone.height / 2), endZone.width, endZone.height);
};
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
let handleMovement = (dir) => {
    console.log(dir);
    switch (dir) {
        case Direction.Up:
            break;
        case Direction.Down:
            break;
        case Direction.Left:
            level.player.posX -= player.width;
            break;
        case Direction.Right:
            level.player.posX += player.width;
            break;
    }
};
const arrowPrefix = "Arrow";
let handleArrowKeys = (arrowPress) => {
    let cleanedPressString = arrowPress.slice(arrowPrefix.length);
    const enumValue = cleanedPressString;
    handleMovement(Direction[enumValue]);
};
document.addEventListener('keydown', (event) => {
    console.log('Keydown event:', event.key, event.code);
    if (event.key.startsWith(arrowPrefix)) {
        handleArrowKeys(event.key);
    }
    console.log(level);
    drawLevel(level);
});
drawLevel(level);
