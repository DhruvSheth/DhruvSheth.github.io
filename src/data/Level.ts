import { Coin } from "./Coins";
import { Entity } from "./Entity";
import { Platform } from "./Platform";
import { Player } from "./Player";

interface Level {
    platforms: Platform[];
    coins: Coin[];
    player: Player;
    endZone: Entity;
}

export { Level}