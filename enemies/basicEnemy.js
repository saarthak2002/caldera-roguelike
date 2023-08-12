import dungeon from "../dungeon.js";
import turnManager from "../turnManager.js";
import Taggable from "../taggable.js";
import { getRandomItem } from "../items.js";
import GenericItem from "../items/genericItem.js";

export default class BasicEnemy extends Taggable {
    constructor(x, y) {
        super(x, y);
        this.name = "Basic Enemy";
        this.movementPoints = 1;
        this.attackPoints = 1;
        this.healthPoints = 1;
        this.maxHealthPoints = this.healthPoints;
        this.moving = false;
        this.weapon = new GenericItem();

        this.refreshRates = {
            movementPoints: 1,
            actionPoints: 1,
            healthPoints: 0
        };

        this.damage = {
            max: 4,
            min: 1
        };

        this.defense = {
            max: 0,
            min: 0
        };

        this.loot = [];
        this.x = x;
        this.y = y;
        this.tile = 109;
        this.type = "enemy";
        this.active = true;
    }

    refresh() {
        this.movementPoints = this.refreshRates.movementPoints;
        this.actionPoints = this.refreshRates.actionPoints;
        if(this.refreshRates.healthPoints > 0 && this.healthPoints <= this.maxHealthPoints) {
            this.healthPoints += this.refreshRates.healthPoints;
        }
    }

    attack() {
        return Phaser.Math.Between(this.damage.min, this.damage.max);
    }

    protection() {
        return Phaser.Math.Between(this.defense.min, this.defense.max);
    }

    turn() {

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

        this.UIsprite = scene.add
            .sprite(x, y, 'tiles', this.tile)
            .setOrigin(0)
            .setInteractive({ useHandCursor: true });

        if(this.tint) {
            this.UIsprite.tint = this.tint;
        }

        this.UIsprite.on("pointerup", pointer => {
            if(pointer.leftButtonReleased()) {
                dungeon.describeEntity(this);
            }
        });

        this.UItext = scene.add.text(x + 20, y, this.name, { font: '16px arcade', fill: '#cfc6b8' })
            .setInteractive({ useHandCursor: true });

        this.UItext.on("pointerup", pointer => {
            if (pointer.leftButtonReleased()) {
                dungeon.describeEntity(this);
            }
        });

        this.HPtext = scene.add.text(x + 20, y + 15, `HP: ${this.healthPoints}`, { font: '9px Arial', fill: '#a8a196' });
        return 30;
    }
}