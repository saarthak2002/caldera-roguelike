import dungeon from "../dungeon.js";
import turnManager from "../turnManager.js";
import CursedSceptre from "../items/cursedSceptre.js";

export default class Bat {
    constructor(x, y) {
        this.name = 'A Bat';
        this.movementPoints = 3;
        this.actionPoints = 2;
        this.healthPoints = 1;
        this.x = x;
        this.y = y;
        this.tile = 120;
        this.type = "enemy";
        this.active = true;
        dungeon.initializeEntity(this);
    }
    refresh() {
        this.movementPoints = 2;
        this.actionPoints = 2;
    }

    turn() {
        let oldX = this.x;
        let oldY = this.y;
        let playerX = dungeon.player.x;
        let playerY = dungeon.player.y;
        let grid = new PF.Grid(dungeon.level);
        let finder = new PF.AStarFinder();
        let path = finder.findPath(oldX, oldY, playerX, playerY, grid);

        if (this.actionPoints > 0) {
            if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 3) {
                dungeon.attackEntity(this, dungeon.player);
            }
            this.actionPoints -= 1;
        }

        if (this.movementPoints > 0) {
            if (path.length > 2) {
                dungeon.moveEntityTo(this, path[1][0], path[1][1]);
            }
            this.movementPoints -= 1;
        }
    }

    attack() {
        return 1;
    }

    onDestroy() {
        dungeon.log(`${this.name} has been destroyed!`);
        turnManager.addEntity(new CursedSceptre(this.x, this.y));
        this.UIsprite.setAlpha(0.2);
        this.UItext.setAlpha(0.2);
        this.HPtext.setAlpha(0.2);
        this.HPtext.setText(
            `HP: 0`
        );
    }

    over() {
        let isOver = this.movementPoints == 0 && this.actionPoints == 0 && !this.moving;
        if (isOver && this.UItext) {
            this.UItext.setColor('#cfc6b8')
        }
        else {
            this.UItext.setColor('#50C878')
        }
        if (this.HPtext) {
            this.HPtext.setText(
                `HP: ${this.healthPoints}`
            );
        }
        return isOver;
    }

    createUI(config) {
        let scene = config.scene;
        let x = config.x;
        let y = config.y;

        this.UIsprite = scene.add.sprite(x, y, 'tiles', this.tile).setOrigin(0);
        this.UItext = scene.add.text(x + 20, y, this.name, { font: '16px arcade', fill: '#cfc6b8' });
        this.HPtext = scene.add.text(x + 20, y + 15, `HP: ${this.healthPoints}`, { font: '9px Arial', fill: '#a8a196' });
        return 30;
    }
}