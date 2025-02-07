import { Entity } from "./Entity";
import { Platform } from "./Platform";
import { Player } from "./Player";

interface Level {
    platforms: Platform[];
    player: Player;
    endZone: Entity;
}

export { Level}