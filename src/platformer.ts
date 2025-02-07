import { Coin } from "./data/Coins";
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


const player: Player = {
    momentumX: 0,
    momentumY: 0,
    posX: 60,
    posY: halfWindowHeight,
    width: 30,
    height: 60,
    hasDoubleJump: true
}

const platform: Platform = {
    height: halfWindowHeight,
    startX: 0,
    endX: windowWidth
}
const platform2: Platform = {
    height: halfWindowHeight - 100,
    startX: 200,
    endX: 600
}

const coin: Coin = {
    posX: 300,
    posY: 300,
    width: 30,
    height: 30
}
const endZone: Entity = {
    posX: windowWidth - 240,
    posY: halfWindowHeight,
    width: 240,
    height: 120
}

const level: Level = {
    platforms: [platform, platform2],
    coins: [coin],
    player,
    endZone
}

const initalCoinCount = level.coins.length;

let drawLevel = ({ player, endZone, platforms, coins }: Level) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore()
    drawPlayer(player)
    drawEndzone(endZone)
    coins.forEach((coin) => drawCoin(coin))
    platforms.forEach((platform) => drawPlatform(platform))

}

let drawScore = () => {
    const scoreHorizontalOffset = 10;
    const scoreMaxWidth = windowWidth - (scoreHorizontalOffset* 2)
    const fontSize = 50;
    ctx.fillStyle = "black";
    ctx.font = `${fontSize}px Courier New`;
    var scoreString = `${level.coins.length} coins left out of ${initalCoinCount}`;
    ctx.strokeText(scoreString, scoreHorizontalOffset, fontSize, scoreMaxWidth);
}

let drawCoin = (coin: Coin) => {
    ctx.fillStyle = "gold";
    ctx.fillRect(coin.posX, coin.posY, coin.width, coin.height);
}

let drawPlatform = (platform: Platform) => {
    ctx.fillStyle = "black";
    ctx.fillRect(platform.startX, platform.height + 60, platform.endX - platform.startX, 20);

}

let drawPlayer = (player: Player) => {
    ctx.fillStyle = "grey";
    ctx.fillRect(player.posX, player.posY, player.width, player.height);

}

let drawEndzone = (endZone: Entity) => {
    ctx.fillStyle = "green";
    ctx.fillRect(endZone.posX, endZone.posY - (endZone.height / 2), endZone.width, endZone.height);
}

enum Direction {
    Up,
    Down,
    Left,
    Right,
  }

let handleMovement = (dir: Direction) => {
    console.log(dir)
    switch(dir) {
        case Direction.Up:
            if (isPlayerGrounded(level)) {
                level.player.momentumY = -30;
                level.player.hasDoubleJump = true;
            } else if (level.player.hasDoubleJump) {
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
}

const arrowPrefix = "Arrow"

let handleArrowKeys = (arrowPress: String) => {
    let cleanedPressString = arrowPress.slice(arrowPrefix.length)
    const enumValue = cleanedPressString as keyof typeof Direction;
    handleMovement(Direction[enumValue])
}


document.addEventListener('keydown', (event) => {
    console.log('Keydown event:', event.key, event.code);
    if (event.key.startsWith(arrowPrefix)) {
        handleArrowKeys(event.key);
    }
    console.log(level)
});


let isPlayerHorizontallyOnPlatform = (platform: Platform, player: Player): boolean => {
    return platform.startX < player.posX && platform.endX > player.posX;
}


let isPlayerGrounded = (level: Level): boolean => {
    return level.platforms.some(platform => platform.height == player.posY && isPlayerHorizontallyOnPlatform(platform, player))
}

// return the height of the platform the player is passing in the next tick, else -1
let heightOfGroundPlayerIsPassing = (level: Level): number => {
    let aboveBeforeTick = level.platforms.map(platform => platform.height > player.posY && isPlayerHorizontallyOnPlatform(platform, player));
    let aboveAfterTick = level.platforms.map(platform => platform.height > player.posY + player.momentumY && isPlayerHorizontallyOnPlatform(platform, player));
    for (let i = 0; i < level.platforms.length; i += 1) {
        if (aboveBeforeTick[i] && !aboveAfterTick[i]) {
            return level.platforms[i].height;
        }
    }
    return -1;
}

let handleMomentum = (level: Level) => {
    let momX = level.player.momentumX;
    let momY = level.player.momentumY;
    level.player.posX += momX;
    level.player.posY += momY;


    if (momX < 0) {
        level.player.momentumX += 1;
    } else if (momX > 0) {
        level.player.momentumX -= 1;
    }
    let passingGround = heightOfGroundPlayerIsPassing(level)
    
    if (isPlayerGrounded(level)) {
        level.player.momentumY = 0;

    } else if (passingGround > -1) {
        level.player.momentumY = 0;
        level.player.posY = passingGround;
    }
    else {
        level.player.momentumY += 3;
    }

}

let doEntitiesOverlap = (ent1: Entity, ent2: Entity): boolean => {
    let horizCollisionSize = ent1.width + ent2.width;
    let vertCollisionSize = ent1.height + ent2.height;
    return Math.abs(ent1.posX - ent2.posX) < horizCollisionSize && Math.abs(ent1.posY - ent2.posY) < vertCollisionSize;
}

let handleCheckCoins = (level: Level) => {
    level.coins = level.coins.filter((coin) => !doEntitiesOverlap(coin, level.player));
}

let gameLoop = () => {
    drawLevel(level);
    handleMomentum(level);
    handleCheckCoins(level);
    requestAnimationFrame(gameLoop)
}

gameLoop();