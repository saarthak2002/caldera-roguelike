import dungeon from "../dungeon.js";
import BasicEnemy from "./basicEnemy.js";

export default class Troll extends BasicEnemy {
    constructor(x, y) {
        super(x, y);
        this.name = `Troll`;
        this.movementPoints = 2;
        this.actionPoints = 1;
        this.healthPoints = 8;
        this.refreshRates = {
            movementPoints: 2,
            actionPoints: 1,
            healthPoints: 0
        };
        this.damage = {
            max: 6,
            min: 3 
        };
        this.x = x;
        this.y = y;
        this.tile = 87;
        this.type = "enemy";
        this.active = true;
        this.weapon.name = "club";
        this.destroyPoints = 500;
        dungeon.initializeEntity(this);
    }
}