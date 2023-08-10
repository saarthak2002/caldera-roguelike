import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class LessserHealingPotion extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 127;
        this.name = 'Lesser Healing Potion';
        this.description = 'A potion that restores a little HP';
        this.weapon = false;

        dungeon.initializeEntity(this);
    }
    
    equip(itemNumber) {
        dungeon.healSound.play();
        dungeon.log(`${dungeon.player.name} has gained 2 HP!`);
        dungeon.player.healthPoints += 2;
        dungeon.player.removeItem(itemNumber);
    }
}