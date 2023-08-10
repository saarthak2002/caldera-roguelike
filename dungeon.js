import level from "./level.js";
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
    initialize: function (scene) {
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
    attackEntity: function (attackingEntity, victimEntity) {
        attackingEntity.moving = true;
        attackingEntity.tweens = attackingEntity.tweens || 0;
        attackingEntity.tweens += 1;
        
        if(attackingEntity.name === 'A Poweful Wizard') {
            this.magicAttackSound.play();
        }
        else if(attackingEntity.name === 'A Necromancer') {
            this.massiveHit.play();
        }
        else {
            this.attackSound.play();
        }
        
        this.scene.tweens.add({
            targets: attackingEntity.sprite,
            onComplete: () => {
                attackingEntity.sprite.x = this.map.tileToWorldX(attackingEntity.x);
                attackingEntity.sprite.y = this.map.tileToWorldY(attackingEntity.y);
                attackingEntity.moving = false;
                attackingEntity.tweens -= 1;

                let damage = attackingEntity.attack();
                
                if(victimEntity.defensePower) {
                    damage -= victimEntity.defensePower;
                }
                victimEntity.healthPoints -= damage;

                this.log(`${attackingEntity.name} does ${damage} damage to ${victimEntity.name} which now has ${victimEntity.healthPoints} HP left!`);

                if(victimEntity.healthPoints <= 0) {
                    this.removeEntity(victimEntity);
                }
            },
            x: this.map.tileToWorldX(victimEntity.x),
            y: this.map.tileToWorldY(victimEntity.y),
            ease: 'Power2',
            hold: 20,
            duration: 80,
            delay: attackingEntity.tweens * 200,
            yoyo: true
        });
    },
    removeEntity: function (entity) {
        turnManager.entities.delete(entity);
        entity.sprite.destroy();
        delete entity.sprite;
        entity.onDestroy();
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
}

export default dungeon