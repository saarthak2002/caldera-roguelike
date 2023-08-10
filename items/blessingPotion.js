import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class BlessingPotion extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 113;
        this.name = 'Blessing Potion';
        this.description = 'A potion said to drive away evil spirits.';
        this.weapon = false;

        dungeon.initializeEntity(this);
    }
    
    equip(itemNumber) {
        dungeon.healSound.play();
        dungeon.log(`${dungeon.player.name} was cured of all curses`);
        dungeon.player.removeItemByProperty('cursed', true);
        dungeon.player.removeItem(itemNumber);
    }
}