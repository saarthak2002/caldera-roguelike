import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class CursedSceptre extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 129;
        this.name = 'A Cursed Sceptre';
        this.description = 'You feel a dark presence emanating from this sceptre';
        this.actionPoints = 1;
        this.cursed = true;

        dungeon.initializeEntity(this);
    }
    
    turn() {
        if(dungeon.player.items.includes(this)) {
            dungeon.log(`${dungeon.player.name} is cursed and takes damage!`);
            dungeon.player.healthPoints -= 1;
        }
        this.actionPoints = 0;
    }

    refresh() {
        this.actionPoints = 1;
    }

    over() {
        return this.actionPoints == 0;
    }
}