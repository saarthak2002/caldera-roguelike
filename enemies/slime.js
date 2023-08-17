import dungeon from "../dungeon.js";
import BasicEnemy from "./basicEnemy.js";

export default class Slime extends BasicEnemy {
    constructor(x, y) {
        super(x, y);
        this.name = `Slime`;
        this.movementPoints = 2;
        this.actionPoints = 1;
        this.healthPoints = 4;
        this.refreshRates = {
            movementPoints: 2,
            actionPoints: 1,
            healthPoints: 1
        };
        this.damage = {
            max: 5,
            min: 2 
        };
        this.x = x;
        this.y = y;
        this.tile = 108;
        this.type = "enemy";
        this.active = true;
        this.weapon.name = "poison";
        this.destroyPoints = 300;
        dungeon.initializeEntity(this);
    }
}