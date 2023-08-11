import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class IncantationOfFire extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 82;
        this.tint = 0xdd0000;
        this.attackTile = 61;
        this.name = 'Incantation of Fire';
        this.description = 'A scroll with an ancient spell. Range: 5';
        this.weapon = true;
        this.magic = true;
        dungeon.initializeEntity(this);
    }

    damage() {
        return Phaser.Math.Between(1, 4)
    }
    range() {
        return 5;
    }
}