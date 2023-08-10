import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class Bow extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.name = 'A Bow';
        this.tile = 131;
        this.attackTile = 62;
        this.description = 'A small bow and quiver. Range: 4';
        this.weapon = true;
        dungeon.initializeEntity(this);
    }
    damage() {
        return Phaser.Math.Between(1, 3)
    }
    range() {
        return 5;
    }
}