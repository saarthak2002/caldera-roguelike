import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class Broadsword extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 106;
        this.name = 'Broadsword';
        this.description = 'A powerful sword wielded by knights';
        this.weapon = true;

        dungeon.initializeEntity(this);
    }

    damage() {
        return Phaser.Math.Between(6, 12)
    }
}