import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class CurseOfDeath extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 64;
        this.name = 'Curse of Death';
        this.description = 'Something stirs deep within the dungeon...';
        this.weapon = true;
        this.curseOfDeath = true;
        dungeon.initializeEntity(this);
    }
}