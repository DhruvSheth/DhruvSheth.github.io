"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas = document.getElementById("platformerCanvas");
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Element is not a canvas");
}
var ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Failed to get 2D context");
}
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var halfWindowHeight = window.innerHeight / 2;
canvas.width = windowWidth;
canvas.height = windowHeight;
// we want to respect the size of the window
function handleResize() {
}
window.addEventListener('resize', handleResize);
// hello world
ctx.fillStyle = "black";
ctx.font = "50px Courier New";
var helloWorld = "Hello World!";
ctx.strokeText(helloWorld, 10, 50);
var player = {
    momentumX: 0,
    momentumY: 0,
    posX: 60,
    posY: halfWindowHeight,
    width: 30,
    height: 60
};
var platform = {
    height: halfWindowHeight + 60,
    startX: 0,
    endX: windowWidth
};
var endZone = {
    posX: windowWidth - 240,
    posY: halfWindowHeight,
    width: 240,
    height: 120
};
var level = {
    platforms: [platform],
    player: player,
    endZone: endZone
};
var drawLevel = function (_a) {
    var player = _a.player, endZone = _a.endZone, platforms = _a.platforms;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer(player);
    drawEndzone(endZone);
    platforms.forEach(function (platform) { return drawPlatform(platform); });
};
var drawPlatform = function (platform) {
    ctx.fillStyle = "black";
    ctx.fillRect(platform.startX, platform.height, platform.endX - platform.startX, 20);
};
var drawPlayer = function (player) {
    ctx.fillStyle = "grey";
    ctx.fillRect(player.posX, player.posY, player.width, player.height);
};
var drawEndzone = function (endZone) {
    ctx.fillStyle = "green";
    ctx.fillRect(endZone.posX, endZone.posY - (endZone.height / 2), endZone.width, endZone.height);
};
drawLevel(level);
