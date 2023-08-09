import dungeon from "../dungeon.js";

export default class Blacksmith {
    constructor(x, y) {
        this.name = 'A Friendly Blacksmith';
        this.movementPoints = 1;
        this.actionPoints = 1;
        this.healthPoints = 100;
        this.x = x;
        this.y = y;
        this.tile = 97;
        this.interactable = true;
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
            dungeon.upgradeSound.play();
            dungeon.log(`${this.name}: This dungeon is overrun with monsters! Let me help you!`);
            dungeon.player.attackPower = 3;
            dungeon.log(`${dungeon.player.name} now has 3 attack power!`);
        }
    }

    attack() {
        return 0;
    }

    onDestroy() {
        dungeon.log(`${this.name} has been destroyed!`);
        dungeon.player.healthPoints += 5;
        dungeon.log(`${dungeon.player.name} has gained 5 HP!`);
    }

    over() {
        return this.movementPoints == 0 && this.actionPoints == 0 && !this.moving;
    }
}