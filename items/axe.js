import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class Axe extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.name = 'An Axe';
        this.tile = '119';
        this.description = 'An axe crafted by an ancient race of dwarves';
        this.weapon = true;
        dungeon.initializeEntity(this);
    }
    damage() {
        return Phaser.Math.Between(1, 7)
    }
}