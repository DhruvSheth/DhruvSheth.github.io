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
    height: 60,
    hasDoubleJump: true
};
const platform = {
    height: halfWindowHeight,
    startX: 0,
    endX: windowWidth
};
const platform2 = {
    height: halfWindowHeight - 100,
    startX: 200,
    endX: 600
};
const endZone = {
    posX: windowWidth - 240,
    posY: halfWindowHeight,
    width: 240,
    height: 120
};
const level = {
    platforms: [platform, platform2],
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
    ctx.fillRect(platform.startX, platform.height + 60, platform.endX - platform.startX, 20);
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
            if (isPlayerGrounded(level)) {
                level.player.momentumY = -30;
                level.player.hasDoubleJump = true;
            }
            else if (level.player.hasDoubleJump) {
                level.player.momentumY -= 30;
                level.player.hasDoubleJump = false;
            }
            break;
        case Direction.Down:
            break;
        case Direction.Left:
            level.player.momentumX = -15;
            break;
        case Direction.Right:
            level.player.momentumX = 15;
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
});
let isPlayerHorizontallyOnPlatform = (platform, player) => {
    return platform.startX < player.posX && platform.endX > player.posX;
};
let isPlayerGrounded = (level) => {
    return level.platforms.some(platform => platform.height == player.posY && isPlayerHorizontallyOnPlatform(platform, player));
};
// return the height of the platform the player is passing in the next tick, else -1
let heightOfGroundPlayerIsPassing = (level) => {
    let aboveBeforeTick = level.platforms.map(platform => platform.height > player.posY && isPlayerHorizontallyOnPlatform(platform, player));
    let aboveAfterTick = level.platforms.map(platform => platform.height > player.posY + player.momentumY && isPlayerHorizontallyOnPlatform(platform, player));
    for (let i = 0; i < level.platforms.length; i += 1) {
        if (aboveBeforeTick[i] && !aboveAfterTick[i]) {
            return level.platforms[i].height;
        }
    }
    return -1;
};
let handleMomentum = (level) => {
    let momX = level.player.momentumX;
    let momY = level.player.momentumY;
    level.player.posX += momX;
    level.player.posY += momY;
    if (momX < 0) {
        level.player.momentumX += 1;
    }
    else if (momX > 0) {
        level.player.momentumX -= 1;
    }
    let passingGround = heightOfGroundPlayerIsPassing(level);
    if (isPlayerGrounded(level)) {
        level.player.momentumY = 0;
    }
    else if (passingGround > -1) {
        level.player.momentumY = 0;
        level.player.posY = passingGround;
    }
    else {
        level.player.momentumY += 3;
    }
};
let gameLoop = () => {
    drawLevel(level);
    handleMomentum(level);
    requestAnimationFrame(gameLoop);
};
gameLoop();
