import Taggable from "../taggable.js";

export default class GenericItem extends Taggable {
    constructor(x,y) {
        super(x,y);
        this.active = false;
        this.type = 'item';
        this.weapon = false;
        this.name = 'Nameless Item';
        this.description = 'the creator of everyhting';

        if(x && y) {
            this.x = x;
            this.y = y;
        }
    }

    damage() {
        return 0;
    }

    turn() {

    }

    equip() {

    }

    unequip() {
        
    }

    refresh() {

    }

    over() {
        return true;
    }

    createUI() {
        return 0;
    }

    protection() {
        return 0;
    }

    range() {
        return 0;
    }
}