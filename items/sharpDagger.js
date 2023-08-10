import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class SharpDagger extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 105;
        this.name = 'Sharp Dagger';
        this.description = 'A dagger fashioned from a sharp piece of metal.';
        this.weapon = true;

        dungeon.initializeEntity(this);
    }

    damage() {
        return Phaser.Math.Between(2, 4);
    }
}