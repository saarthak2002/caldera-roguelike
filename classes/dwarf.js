import BasicHero from "./basicHero.js";
import Axe from "../items/axe.js";
import Shield from "../items/shield.js";
import dungeon from "../dungeon.js";

export default class Dwarf extends BasicHero {
    constructor(x, y) {
        super(x, y);

        this.name = 'Dwarf';
        this.movementPoints = 2;
        this.actionPoints = 2;
        this.healthPoints = 35;
        this.tile = 88;

        this.items.push(new Axe());
        this.toggleItem(0);
        this.items.push(new Shield());
        this.toggleItem(1);

        dungeon.initializeEntity(this);
    }

    refresh() {
        this.movementPoints = 2;
        this.actionPoints = 2;
    }
}