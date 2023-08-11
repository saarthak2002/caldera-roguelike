import BasicHero from "./basicHero.js";
import Bow from "../items/bow.js";
import dungeon from "../dungeon.js";

export default class Elf extends BasicHero {
    constructor(x, y) {
        super(x, y);

        this.name = 'Elf';
        this.movementPoints = 4;
        this.actionPoints = 3;
        this.healthPoints = 20;
        this.tile = 100;

        this.items.push(new Bow());
        this.toggleItem(0);

        dungeon.initializeEntity(this);
    }

    refresh() {
        this.movementPoints = 4;
        this.actionPoints = 3;
    }
}