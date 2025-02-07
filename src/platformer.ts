import { Entity } from "./data/Entity";
import { Level } from "./data/Level";
import { Platform } from "./data/Platform";
import { Player } from "./data/Player";

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


// we want to respect the size of the window
function handleResize() {
}
  
window.addEventListener('resize', handleResize);

// hello world
ctx.fillStyle = "black";
ctx.font = `50px Courier New`;
const helloWorld = `Hello World!`;
ctx.strokeText(helloWorld, 10, 50);


const player: Player = {
    momentumX: 0,
    momentumY: 0,
    posX: 60,
    posY: halfWindowHeight,
    width: 30,
    height: 60
}

const platform: Platform = {
    height: halfWindowHeight + 60,
    startX: 0,
    endX: windowWidth
}

const endZone: Entity = {
    posX: windowWidth - 240,
    posY: halfWindowHeight,
    width: 240,
    height: 120
}

const level: Level = {
    platforms: [platform],
    player,
    endZone
}


let drawLevel = ({ player, endZone, platforms }: Level) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer(player)
    drawEndzone(endZone)
    platforms.forEach((platform) => drawPlatform(platform))

}

let drawPlatform = (platform: Platform) => {
    ctx.fillStyle = "black";
    ctx.fillRect(platform.startX, platform.height, platform.endX - platform.startX, 20);

}

let drawPlayer = (player: Player) => {
    ctx.fillStyle = "grey";

    ctx.fillRect(player.posX, player.posY, player.width, player.height);

}

let drawEndzone = (endZone: Entity) => {
    ctx.fillStyle = "green";

    ctx.fillRect(endZone.posX, endZone.posY - (endZone.height / 2), endZone.width, endZone.height);
}


drawLevel(level);