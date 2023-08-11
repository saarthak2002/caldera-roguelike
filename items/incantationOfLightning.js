import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class IncantationOfLightning extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 82;
        this.tint = 0xe6db10;
        this.attackTile = 61;
        this.name = 'Incantation of Lightning';
        this.description = 'A scroll with an ancient spell. Range: 7';
        this.weapon = true;
        this.magic = true;
        dungeon.initializeEntity(this);
    }

    damage() {
        return Phaser.Math.Between(1, 2);
    }
    range() {
        return 7;
    }
}