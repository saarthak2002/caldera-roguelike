import BasicHero from "./basicHero.js";
import Hammer from "../items/hammer.js";
import dungeon from "../dungeon.js";

export default class Sorcerer extends BasicHero {
    constructor(x, y) {
        super(x, y);

        this.name = 'Sorcerer';
        this.movementPoints = 3;
        this.actionPoints = 2;
        this.healthPoints = 40;
        this.tile = 99;

        this.items.push(new Hammer());
        this.toggleItem(0);

        dungeon.initializeEntity(this);
    }

    refresh() {
        this.movementPoints = 3;
        this.actionPoints = 2;
    }
}