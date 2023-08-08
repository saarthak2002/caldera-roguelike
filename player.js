import dungeon from "./dungeon.js";

export default class PlayerCharacter {
    constructor(x, y) {
        this.movementPoints = 0;
        this.cursors = dungeon.scene.input.keyboard.createCursorKeys();
        this.x = x;
        this.y =y;
        this.tile = 85;
        dungeon.initializeEntity(this);
    }

    refresh() {
        this.movementPoints = 1;
    }

    turn() {
        let newX = this.x;
        let newY = this.y;
        let moved = false;

        if(this.movementPoints > 0 && !this.moving) {
            if(this.cursors.left.isDown) {
                newX -= 1;
                moved = true;
            }
            if (this.cursors.right.isDown) {
                newX += 1;
                moved = true;
            }
            if (this.cursors.up.isDown) {
                newY -= 1;
                moved = true;
            }
            if (this.cursors.down.isDown) {
                newY += 1;
                moved = true;
            }
            if (moved) {
                this.movementPoints -= 1;
                if(dungeon.isWalkableTile(newX, newY)) {
                    dungeon.moveEntityTo(this, newX, newY);
                }
            }
        }
    }

    over() {
        return this.movementPoints == 0 && !this.moving;
    }
}