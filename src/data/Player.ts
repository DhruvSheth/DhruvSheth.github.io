import { Entity } from './Entity'

interface Player extends Entity {
    momentumX: number;
    momentumY: number;
    hasDoubleJump: boolean;
}

export { Player }