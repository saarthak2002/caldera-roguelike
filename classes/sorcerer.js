import BasicHero from "./basicHero.js";
import IncantationOfFire from "../items/incantationOfFire.js";
import IncantationOfLightning from "../items/incantationOfLightning.js";
import dungeon from "../dungeon.js";
import HealingPotion from "../items/healingPotion.js";
import LessserHealingPotion from "../items/lesserHealingPotion.js";

export default class Sorcerer extends BasicHero {
    constructor(x, y) {
        super(x, y);

        this.name = 'Sorcerer';
        this.movementPoints = 3;
        this.actionPoints = 2;
        this.healthPoints = 20;
        this.tile = 112;

        this.items.push(new IncantationOfFire());
        this.toggleItem(0);
        this.items.push(new IncantationOfLightning());
        this.items.push(new HealingPotion());
        this.items.push(new LessserHealingPotion());

        dungeon.initializeEntity(this);
    }

    refresh() {
        this.movementPoints = 3;
        this.actionPoints = 2;
    }
}