import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class Hammer extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.name = 'A Hammer';
        this.tile = '117';
        this.description = 'A heavy but powerful hammer';
        this.weapon = true;
        dungeon.initializeEntity(this);
    }
    damage() {
        return Phaser.Math.Between(3, 5)
    }
}