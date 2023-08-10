import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class Shield extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 102;
        this.name = 'A Shield';
        this.description = 'A shield crafted by ancient dwarves';
        this.weapon = false;

        dungeon.initializeEntity(this);
    }

    protection() {
        return 1;
    }
}