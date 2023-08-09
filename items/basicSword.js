import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class BasicSword extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 103;
        this.name = 'Broken Sword';
        this.description = 'A worn out sword that has seen better days.';
        this.weapon = true;

        dungeon.initializeEntity(this);
    }

    damage() {
        return Phaser.Math.Between(1, 2)
    }
}