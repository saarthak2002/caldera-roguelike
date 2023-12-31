import BasicHero from "./classes/basicHero.js";
import turnManager from "./turnManager.js";

let dungeon = {
    messages: [],
    log: function (message) {
        this.messages.unshift(message);
        this.messages = this.messages.slice(0, 8);
    },
    sprites: {
        floor: 0,
        wall: 14,
        pillarTop: 6,
        pillarMiddle: 18,
        pillarBottom: 30,
        spoutMouth: 20,
        spoutDrain: 32,
        caveLeft : 10,
        caveRight : 11,
        window : 28,
        minecart : 55,
        trackLeft : 93,
        trackRight : 95,
        trackStraight : 83,
        anvil : 74,
    },
    tileSize: 16,
    initialize: function (scene, level) {
        this.scene = scene;
        this.level = level;
        let levelWithTiles = level.map(row => {
            return row.map(tile => {
                return tile === 1 ? this.sprites.wall : this.sprites.floor;
            })
        });

        const config = {
            data: levelWithTiles,
            tileWidth: this.tileSize,
            tileHeight: this.tileSize,
        }
        const map = scene.make.tilemap(config);
        const tileset = map.addTilesetImage('tiles', 'tiles', this.tileSize, this.tileSize, 0, 1);
        this.map = map.createLayer(0, tileset, 0, 0);
    },
    initializeEntity: function (entity) {
        if(entity.x && entity.y) {
            let x = this.map.tileToWorldX(entity.x);
            let y = this.map.tileToWorldY(entity.y);
            entity.sprite = this.scene.add.sprite(x, y, 'tiles', entity.tile);
            entity.sprite.setOrigin(0);
            if(entity.tint) {
                entity.sprite.tint = entity.tint;
                entity.sprite.tintFill = true;
            }
        }
    },
    moveEntityTo: function (entity, x, y) {
        entity.moving = true;
        entity.x = x;
        entity.y = y;
        this.scene.tweens.add({
            targets: entity.sprite,
            onComplete: () => {
                entity.moving = false;
            },
            x: this.map.tileToWorldX(x),
            y: this.map.tileToWorldY(y),
            ease: 'Power2',
            duration: 200,
        });
    },
    isWalkableTile: function (x, y) {
        let entities = [...turnManager.entities];
        for(let entity_i=0; entity_i<entities.length; entity_i++) {
            let entity = entities[entity_i];
            if(entity.sprite && entity.x === x && entity.y === y) {
                return false;
            }
        }
        let tileAtDestination = dungeon.map.getTileAt(x, y);
        if(tileAtDestination === null) {
            console.log('world end');
            return false;
        }
        return (
            tileAtDestination.index !== dungeon.sprites.wall
            && tileAtDestination.index !== dungeon.sprites.pillarTop
            && tileAtDestination.index !== dungeon.sprites.pillarMiddle
            && tileAtDestination.index !== dungeon.sprites.pillarBottom
            && tileAtDestination.index !== dungeon.sprites.spoutDrain
            && tileAtDestination.index !== dungeon.sprites.spoutMouth
            && tileAtDestination.index !== dungeon.sprites.caveLeft
            && tileAtDestination.index !== dungeon.sprites.caveRight
            && tileAtDestination.index !== dungeon.sprites.window
            && tileAtDestination.index !== dungeon.sprites.minecart
            && tileAtDestination.index !== dungeon.sprites.anvil
            && tileAtDestination.index !== dungeon.sprites.trackLeft
            && tileAtDestination.index !== dungeon.sprites.trackRight
            && tileAtDestination.index !== dungeon.sprites.trackStraight
        );
    },
    entityAtTile: function (x, y) {
        let entities = [...turnManager.entities];
        for(let entity_i=0; entity_i<entities.length; entity_i++) {
            let entity = entities[entity_i];
            if(entity.sprite && entity.x === x && entity.y === y) {
                return entity;
            }
        }
        return false;
    },
    distanceBetweenEntities: function (entity1, entity2) {
        let grid = new PF.Grid(dungeon.level);
        let finder = new PF.AStarFinder({
            allowDiagonal: true,
        });
        let path = finder.findPath(entity1.x, entity1.y, entity2.x, entity2.y, grid);
        if(path.length >= 2) {
            return path.length;
        }
        else {
            return false;
        }
    },

    attackEntity: function (attacker, victim, weapon) {
        attacker.moving = true;
        attacker.tweens = attacker.tweens || 0;
        attacker.tweens += 1;

        let rangedAttack = weapon.range() ? weapon.attackTile : false;
        let tint = weapon.range() && weapon.tint ? weapon.tint : false;

        if(attacker.name === 'A Poweful Wizard') {
            this.magicAttackSound.play();
        }
        else if(attacker.name === 'A Necromancer') {
            this.massiveHit.play();
        }

        else if(attacker instanceof BasicHero) {
            console.log('hi');
            if(attacker.currentWeapon().magic) {
                this.magicAttackSound.play();
            }
            else {
                this.attackSound.play();
            }
        }

        else {
            this.attackSound.play();
        }

        if (!rangedAttack) {
            this.scene.tweens.add({
                targets: attacker.sprite,
                onComplete: () => {
                    if(attacker.sprite) {
                        attacker.sprite.x = this.map.tileToWorldX(attacker.x);
                        attacker.sprite.y = this.map.tileToWorldX(attacker.y);
                        attacker.moving = false;
                        attacker.tweens -= 1;
                    }
                    

                    let attack = attacker.attack();
                    let protection = victim.protection();
                    let damage = attack - protection;
                    if (damage > 0) {
                        victim.healthPoints -= damage;

                        this.log(`${attacker.name} does ${damage} damage to ${victim.name} with ${weapon.name}.`);
                        weapon.executeTag("damagedEntity", victim);

                        if (victim.healthPoints <= 0) {
                            this.removeEntity(victim);
                        }
                    }
                },
                x: this.map.tileToWorldX(victim.x),
                y: this.map.tileToWorldY(victim.y),
                ease: "Power2",
                hold: 20,
                duration: 80,
                delay: attacker.tweens * 200,
                yoyo: true
            });
        }
        else {
            const x = this.map.tileToWorldX(attacker.x);
            const y = this.map.tileToWorldX(attacker.y);
            const sprite = dungeon.scene.add.sprite(x, y, "tiles", rangedAttack).setOrigin(0);

            if (tint) {
                sprite.tint = tint;
                sprite.tintFill = true;
            }

            this.scene.tweens.add({
                targets: sprite,
                onComplete: () => {
                    attacker.moving = false;
                    attacker.tweens -= 1;

                    let attack = attacker.attack();
                    let protection = victim.protection();
                    let damage = attack - protection;
                    if (damage > 0) {
                        victim.healthPoints -= damage;

                        this.log(`${attacker.name} does ${damage} damage to ${victim.name} with ${weapon.name}.`);
                        weapon.executeTag("damagedEntity", victim);

                        if (victim.healthPoints <= 0) {
                            this.removeEntity(victim);
                        }
                    }
                    sprite.destroy()
                },
                x: this.map.tileToWorldX(victim.x),
                y: this.map.tileToWorldY(victim.y),
                ease: "Power2",
                hold: 20,
                duration: 180,
                delay: attacker.tweens * 200
            });
        }
    },

    removeEntity: function (entity) {
        if(entity.type === 'item') {
            return;
        }
        if(entity.sprite) {
            entity.sprite.destroy();
            delete entity.sprite;
        }
        
        entity.onDestroy();
        turnManager.entities.delete(entity);
    },
    itemPicked: function (entity) {
        this.pickupSound.play();
        entity.sprite.destroy();
        delete entity.sprite;
    },
    create3by3Structure: function (originX, originY, structure) {
        this.map.putTileAt(structure[2][1], originX, originY);
        this.level[originY][originX] = 1;
        this.map.putTileAt(structure[2][0], originX-1, originY);
        this.level[originY][originX-1] = 1;
        this.map.putTileAt(structure[2][2], originX+1, originY);
        this.level[originY][originX+1] = 1;
        this.map.putTileAt(structure[1][1], originX, originY-1);
        this.level[originY-1][originX] = 1;
        this.map.putTileAt(structure[1][0], originX-1, originY-1);
        this.level[originY-1][originX-1] = 1;
        this.map.putTileAt(structure[1][2], originX+1, originY-1);
        this.level[originY-1][originX+1] = 1;
        this.map.putTileAt(structure[0][1], originX, originY-2);
        this.level[originY-2][originX] = 1;
        this.map.putTileAt(structure[0][0], originX-1, originY-2);
        this.level[originY-2][originX-1] = 1;
        this.map.putTileAt(structure[0][2], originX+1, originY-2);
        this.level[originY-2][originX+1] = 1;
    },

    describeEntity: function (entity) {
        if(entity) {
            let name = entity.name;
            let description = entity.description || "";
            let tags = entity._tags ? 
                entity._tags.map(tag => `#${tag}`).join(", ") 
            : 
                "";
            dungeon.log(`${name}\n${tags}\n${description}`);
        }
    },

    // randomWalkableTile: function () {
    //     let x = Phaser.Math.Between(0, this.level[0].length - 1);
    //     let y = Phaser.Math.Between(0, this.level.length - 1);
    //     let tileAtDestination = dungeon.map.getTileAt(x, y);
    //     while(typeof tileAtDestination == "undefined" 
    //         || tileAtDestination.index === dungeon.sprites
    //         || tileAtDestination.index === dungeon.sprites.pillarTop
    //         || tileAtDestination.index === dungeon.sprites.pillarMiddle
    //         || tileAtDestination.index === dungeon.sprites.pillarBottom
    //         || tileAtDestination.index === dungeon.sprites.spoutDrain
    //         || tileAtDestination.index === dungeon.sprites.spoutMouth
    //         || tileAtDestination.index === dungeon.sprites.caveLeft
    //         || tileAtDestination.index === dungeon.sprites.caveRight
    //         || tileAtDestination.index === dungeon.sprites.window
    //         || tileAtDestination.index === dungeon.sprites.minecart
    //         || tileAtDestination.index === dungeon.sprites.anvil
    //         || tileAtDestination.index === dungeon.sprites.trackLeft
    //         || tileAtDestination.index === dungeon.sprites.trackRight
    //         || tileAtDestination.index === dungeon.sprites.trackStraight
    //     ) {
    //         x = Phaser.Math.Between(0, this.level[0].length - 1);
    //         y = Phaser.Math.Between(0, this.level.length - 1);
    //         tileAtDestination = dungeon.map.getTileAt(x, y);
    //     }
    //     return {x, y};
    // }

    randomWalkableTile: function () {
        let x = Phaser.Math.Between(0, dungeon.level[0].length - 1);
        let y = Phaser.Math.Between(0, dungeon.level.length - 1);
        let tileAtDestination = dungeon.map.getTileAt(x, y);
        while (typeof tileAtDestination == "undefined" || tileAtDestination.index == dungeon.sprites.wall) {
            x = Phaser.Math.Between(0, dungeon.level[0].length - 1);
            y = Phaser.Math.Between(0, dungeon.level.length - 1);
            tileAtDestination = dungeon.map.getTileAt(x, y);
        }
        return { x, y };
    },

    randomWalkableTileInRoom: function(x, y, w, h) {
        let rx = Phaser.Math.Between(x, (x+w) - 1);
        let ry = Phaser.Math.Between(y, (y+h) - 1);
        let tileAtDestination = dungeon.map.getTileAt(rx, ry);
        while(typeof tileAtDestination == "undefined" || tileAtDestination.index == dungeon.sprites.wall) {
            rx = Phaser.Math.Between(x, (x + w) - 1);
            ry = Phaser.Math.Between(y, (y + h) - 1);
            tileAtDestination = dungeon.map.getTileAt(rx, ry);
        }
        return { x: rx, y: ry };
    }
}

export default dungeon