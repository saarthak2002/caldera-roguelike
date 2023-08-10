import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class SoldiersShield extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 101;
        this.name = 'Soldier\'s Shield';
        this.description = 'A wooden shield that protects against attacks';
        this.weapon = false;

        dungeon.initializeEntity(this);
    }
    
    equip(itemNumber) {
        dungeon.healSound.play();
        dungeon.log(`${dungeon.player.name} has gained 1 defense power!`);
        dungeon.player.addDefenseBuff(1);
        dungeon.player.removeItem(itemNumber);
    }
}