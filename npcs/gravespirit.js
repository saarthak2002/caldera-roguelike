import dungeon from "../dungeon.js";
import CurseOfDeath from "../items/necromancerCurse.js";

export default class GraveSpirit {
    constructor(x, y) {
        this.name = 'A Grave Spirit';
        this.movementPoints = 1;
        this.actionPoints = 1;
        this.healthPoints = 100;
        this.x = x;
        this.y = y;
        this.tile = 64;
        this.interactable = true;
        this.type = 'npc';
        dungeon.level[this.x][this.y] = 1;
        dungeon.initializeEntity(this);
    }

    refresh() {
        this.movementPoints = 1;
        this.actionPoints = 1;
    }

    turn() {
        this.movementPoints -= 1;
        this.actionPoints -= 1;
    }

    interact() {
        if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 2) {
            dungeon.necromancerScream.play();
            let alreadyCursed = false;
            dungeon.player.items.forEach(item => {
                if (item instanceof CurseOfDeath) {
                    alreadyCursed = true;
                }
            }) 
            if(!alreadyCursed) {
                dungeon.player.items.push(new CurseOfDeath());
            }
            dungeon.log(`A mark of death has was etched onto the back of your hand!`);
            dungeon.log(`Something stirs deep within the dungeon...`);
        }
    }

    attack() {
        return 0;
    }

    onDestroy() {
        dungeon.log(`${this.name} has been destroyed!`);
    }

    over() {
        return this.movementPoints == 0 && this.actionPoints == 0 && !this.moving;
    }
}