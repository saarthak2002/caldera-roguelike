import dungeon from "../dungeon.js";
import Taggable from "../taggable.js";

export default class BasicHero extends Taggable {
    constructor(x, y) {
        super(x,y);
        this.name = "The Hero";
        this.score = 0;
        this.movementPoints = 1;
        this.actionPoints = 1;
        this.healthPoints = 30;
        this.x = x;
        this.y =y;
        this.tile = 85;
        this.moving = false;
        this.attackPower = 0;
        this.defensePower = 0;
        this.type = "character";
        this.items = [];
        this.attackBuff = '';
        this.defenseBuff = '';
        this.active = true;

        dungeon.scene.input.keyboard.on("keyup", (event) => {
            if(!this.over()) {
                console.log('key');
                this.processInput(event);
            }
        });

        dungeon.scene.input.on("pointerup", (event) => {
            if (!this.over()) {
                console.log('touch');
                this.processTouchInput(event)
            }
        });
    }

    turn() {
        if(this.healthPoints <= 8) {
            this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
        }
        if(this.healthPoints > 8) {
            this.sprite.clearTint();
        }
        if(this.healthPoints <= 0) {
            this.healthPoints = 15;
            dungeon.scene.events.emit('gameover');
            dungeon.gameover.play();
            alert(`Game Over: ${this.name} has been destroyed!`);
            location.reload();
        }
        this.refreshUI();
    }

    toggleItem(itemNumber) {
        const item = this.items[itemNumber];
        if(item) {
            if(item.weapon) {
                this.items.forEach(item => item.active = item.weapon ? false : item.active);
            }
            item.active = !item.active;
    
            if(item.active) {
                dungeon.log(`${this.name} equipped ${item.name}: ${item.description}.`);
                item.equip(itemNumber, this);
            }
        }
    }

    removeItem(itemNumber) {
        const item = this.items[itemNumber];
        if(item) {
            this.items.forEach(item => {
                item.UIsprite.destroy();
                delete item.UIsprite;
            });
            this.items = this.items.filter(i => i !== item);
            this.refreshUI();
        }
    }

    removeItemByProperty(property, value) {
        this.items.forEach(item => {
            item.UIsprite.destroy();
            delete item.UIsprite;
        });
        this.items = this.items.filter(item => item[property] !== value);
        this.refreshUI();
    }

    equippedItems() {
        return this.items.filter(item => item.active);
    }

    currentWeapon() {
        const items = this.equippedItems();
        const weapon = items.find(item => item.weapon);
        return weapon;
    }

    attack() {
        const items = this.equippedItems();
        const combineDamage = (total, item) => total + item.damage();
        const damage = items.reduce(combineDamage, 0);
        return this.attackPower + damage;
    }

    protection() {
        const items = this.equippedItems();
        const combineProtection = (total, item) => total + item.protection();
        const protection = items.reduce(combineProtection, 0);
        return this.defensePower + protection;
    }

    addAttackBuff(buff) {
        if(buff > this.attackPower) {
            this.attackPower = buff;
            this.attackBuff = `Attack ↑ ${buff}`;
        }
    }

    addDefenseBuff(buff) {
        if(buff > this.defensePower) {
            this.defensePower = buff;
            this.defenseBuff = `Defense ↑ ${buff}`;
        }
    }

    refresh() {
        this.movementPoints = 1;
        this.actionPoints = 1;
    }

    processInput(event) {
        let oldX = this.x;
        let oldY = this.y;
        let moved = false;
        let newX = this.x;
        let newY = this.y;

        let key = event.key;

        if(!isNaN(Number(key))) {
            if(key == 0) {
                key = 10;
            }
            this.toggleItem(key - 1);
        }

        if(event.keyCode == 32) {
            this.movementPoints = 0;
            this.actionPoints = 0;
        }

        if(event.key == "ArrowLeft") {
            newX -= 1;
            moved = true;
        }
        if (event.key == "ArrowRight") {
            newX += 1;
            moved = true;
        }
        if (event.key == "ArrowUp") {
            newY -= 1;
            moved = true;
        }
        if (event.key == "ArrowDown") {
            newY += 1;
            moved = true;
        }

        if(moved) {
            this.movementPoints -= 1;
            if(!dungeon.isWalkableTile(newX, newY)) { // enemy attack
                let entity = dungeon.entityAtTile(newX, newY);

                if(entity && entity.type === 'enemy' && this.actionPoints > 0) {
                    const currentWeapon = this.currentWeapon();
                    const rangeAttack = currentWeapon.range() > 0 ? (currentWeapon.attackTile || currentWeapon.tile) : false;
                    const tint = currentWeapon.tint || false;
                    dungeon.attackEntity(this, entity, currentWeapon);
                    this.actionPoints -= 1;
                    this.movementPoints += 1;
                }

                if(entity && entity.type === 'item' && this.actionPoints > 0) {
                    if(this.items.length >= 10) {
                        dungeon.log(`${this.name}'s inventory is full!`);
                        return;
                    }
                    this.items.push(entity);
                    dungeon.itemPicked(entity);
                    dungeon.log(`${this.name} picked up ${entity.name}: ${entity.description}.`);
                    this.actionPoints -= 1;
                }

                if (entity && entity.type === 'npc' && this.actionPoints > 0) {
                    entity.interact();
                    this.actionPoints -= 1;
                    newX = oldX;
                    newY = oldY;
                }
                else {
                    newX = oldX;
                    newY = oldY;
                }
            }
            if(newX !== oldX || newY !== oldY) {
                dungeon.footsteps.play();
                dungeon.moveEntityTo(this, newX, newY);
            }
        }
    }

    processTouchInput(event) {
        let x = dungeon.map.worldToTileX(event.worldX);
        let y = dungeon.map.worldToTileY(event.worldY);

        let entity = dungeon.entityAtTile(x, y);
        if (entity && entity.type == "enemy" && this.actionPoints > 0) {
            const currentWeapon = this.currentWeapon();
            const rangedAttack = currentWeapon.range() > 0 ? currentWeapon.attackTile || currentWeapon.tile : false;
            const tint = currentWeapon.tint || false;
            const distance = dungeon.distanceBetweenEntities(this, entity);
            if (rangedAttack && distance <= currentWeapon.range()) {
                dungeon.attackEntity(this, entity, currentWeapon);
                this.actionPoints -= 1;
            }
        }
    }

    over() {
        let isOver = this.movementPoints <= 0 && !this.moving;
        if(isOver && this.UIheader) {
            this.UIheader.setColor('#cfc6b8');
            this.actionPoints = 0;
        }
        else {
            this.UIheader.setColor('#50C878');
        }
        if(this.UIstatsText) {
            this.UIstatsText.setText(
                `Hp: ${this.healthPoints}\nMp: ${this.movementPoints}\nAp: ${this.actionPoints}`
            );
        }
        if(this.ScoreHeader) {
            this.ScoreHeader.setText (
                `Score: ${this.score}`
            );
        }
        if(this.UIbuffText) {
            this.UIbuffText.setText(
                `${this.attackBuff}\n${this.defenseBuff}`
            );
        }
        return isOver;
    }

    onDestroy() {
        dungeon.scene.events.emit('gameover');
        dungeon.gameover.play();
        alert(`Game Over: ${this.name} has been destroyed!`);
        location.reload();
    }

    createUI(config) {
        this.UIscene = config.scene;
        let x = config.x;
        let y = config.y;
        let accumulatedHeight = 0;
        this.UIsprite = this.UIscene.add.sprite(x, y, 'tiles', this.tile).setOrigin(0);

        this.UIheader = this.UIscene.add.text(
            x + 20,
            y,
            this.name,
            {
                font: '16px arcade',
                color: '#cfc6b8',
            },
        );

        this.ScoreHeader = this.UIscene.add.text(
            x + 80,
            y,
            `Score: ${this.score}`,
            {
                font: '16px arcade',
                color: '#cfc6b8',
            },
        );

        this.UIstatsText = this.UIscene.add.text(
            x+20,
            y+20,
            `Hp: ${this.healthPoints}\nMp: ${this.movementPoints}\nAp: ${this.actionPoints}`,
            {
                font: '12px Arial',
                color: '#cfc6b8',
            }
        );

        this.UIbuffText = this.UIscene.add.text(
            x+70,
            y+20,
            `${this.attackBuff}\n${this.defenseBuff}`,
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
                    this.UIscene.add.rectangle(rowX, rowY, 20, 20, 0xcfc6b8, 0.3).setOrigin(0)
                    
                );
            }
        }
        accumulatedHeight += 90;

        this.UIscene.add.line(x+5, y+120, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);
        return accumulatedHeight;

    }

    refreshUI() {
        for(let i=0; i<this.items.length; i++) {
            let item = this.items[i];
            if(!item.UIsprite) {
                let x = this.UIitems[i].x + 10;
                let y = this.UIitems[i].y + 10;
                item.UIsprite = this.UIscene.add.sprite(x, y, 'tiles', item.tile);
                // if (item.tint) {
                //     item.UIsprite.tint = item.tint
                //     // item.UIsprite.tintFill = true
                // }
            }
            if(!item.active) {
                item.UIsprite.setAlpha(0.5);
                this.UIitems[i].setStrokeStyle();
            }
            else {
                item.UIsprite.setAlpha(1);
                this.UIitems[i].setStrokeStyle(1, 0xffffff);
            }
        }
    }
}