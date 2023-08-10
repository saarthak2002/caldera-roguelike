import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class HealingPotion extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 115;
        this.name = 'Healing Potion';
        this.description = 'A potion that restores HP';
        this.weapon = false;

        dungeon.initializeEntity(this);
    }
    
    equip(itemNumber) {
        dungeon.healSound.play();
        dungeon.log(`${dungeon.player.name} has gained 5 HP!`);
        dungeon.player.healthPoints += 5;
        dungeon.player.removeItem(itemNumber);
    }
}