import dungeon from "./dungeon.js";

export default class PlayerCharacter {
    constructor(x, y) {
        this.name = 'The Player';
        this.movementPoints = 1;
        this.actionPoints = 1;
        this.healthPoints = 15;
        this.cursors = dungeon.scene.input.keyboard.createCursorKeys();
        this.x = x;
        this.y =y;
        this.tile = 85;
        this.attackPower = 1;
        dungeon.initializeEntity(this);
    }

    refresh() {
        this.movementPoints = 1;
        this.actionPoints = 1;
    }

    turn() {
        let newX = this.x;
        let newY = this.y;
        let moved = false;
        let oldX = this.x;
        let oldY = this.y;

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

                if(!dungeon.isWalkableTile(newX, newY)) { // enemy attack
                    let enemy = dungeon.entityAtTile(newX, newY);

                    if(enemy && this.actionPoints > 0) {
                        if (enemy.interactable) {
                            enemy.interact();
                        }
                        else {
                            dungeon.attackEntity(this, enemy);
                            this.actionPoints -= 1;
                        }
                    }

                    newX = oldX;
                    newY = oldY;
                }

                if(newX !== oldX || newY !== oldY) {
                    dungeon.moveEntityTo(this, newX, newY);
                }
            }
        }
        if(this.healthPoints <= 5) {
            this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
        }
        if(this.healthPoints > 5) {
            this.sprite.clearTint();
        }
    }

    attack() {
        return this.attackPower;
    }

    onDestroy() {
        alert(`Game Over: ${this.name} has been destroyed!`);
        location.reload();
    }

    over() {
        let isOver = this.movementPoints == 0 && !this.moving;
        if(isOver && this.UIheader) {
            this.UIheader.setColor('#cfc6b8')
        }
        else {
            this.UIheader.setColor('#50C878')
        }
        if(this.UIstatsText) {
            this.UIstatsText.setText(
                `Hp: ${this.healthPoints}\nMp: ${this.movementPoints}\nAp: ${this.actionPoints}`
            );
        }
        return isOver;
    }

    createUI(config) {
        let scene = config.scene;
        let x = config.x;
        let y = config.y;
        let accumulatedHeight = 0;
        this.UIsprite = scene.add.sprite(x, y, 'tiles', this.tile).setOrigin(0);

        this.UIheader = scene.add.text(
            x + 20,
            y,
            this.name,
            {
                font: '16px arcade',
                color: '#cfc6b8',
            },
        );

        this.UIstatsText = scene.add.text(
            x+20,
            y+20,
            `Hp: ${this.healthPoints}\nMp: ${this.movementPoints}\nAp: ${this.actionPoints}`,
            {
                font: '12px Arial',
                color: '#cfc6b8',
            }
        );

        accumulatedHeight += this.UIsprite.height + this.UIstatsText.height;

        // Inventory
        let itemsInRow = 5;
        let rows = 2;
        this.UIitems = [];
        for(let row=1; row<=rows; row++) {
            for(let cell=1;cell<=itemsInRow;cell++) {
                let rowX = x + (cell * 25);
                let rowY = y + 50 + (row * 25);
                this.UIitems.push(
                    scene.add.rectangle(rowX, rowY, 20, 20, 0xcfc6b8, 0.3).setOrigin(0)
                );
            }
        }
        accumulatedHeight += 90;

        scene.add.line(x+5, y+120, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);
        return accumulatedHeight;

    }
}