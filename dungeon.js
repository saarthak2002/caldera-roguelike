import level from "./level.js";
import turnManager from "./turnManager.js";

let dungeon = {
    sprites: {
        floor: 0,
        wall: 14,
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
        let x = this.map.tileToWorldX(entity.x);
        let y = this.map.tileToWorldY(entity.y);
        entity.sprite = this.scene.add.sprite(x, y, 'tiles', entity.tile);
        entity.sprite.setOrigin(0);
    },
    moveEntityTo: function (entity, x, y) {
        entity.moving = true;
        this.scene.tweens.add({
            targets: entity.sprite,
            onComplete: () => {
                entity.moving = false;
                entity.x = x;
                entity.y = y;
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
            if(entity.x === x && entity.y === y) {
                return false;
            }
        }
        let tileAtDestination = dungeon.map.getTileAt(x, y);
        return tileAtDestination.index !== dungeon.sprites.wall;
    },
    entityAtTile: function (x, y) {
        let entities = [...turnManager.entities];
        for(let entity_i=0; entity_i<entities.length; entity_i++) {
            let entity = entities[entity_i];
            if(entity.x === x && entity.y === y) {
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

        this.scene.tweens.add({
            targets: attackingEntity.sprite,
            onComplete: () => {
                attackingEntity.sprite.x = this.map.tileToWorldX(attackingEntity.x);
                attackingEntity.sprite.y = this.map.tileToWorldY(attackingEntity.y);
                attackingEntity.moving = false;
                attackingEntity.tweens -= 1;

                let damage = attackingEntity.attack();
                victimEntity.healthPoints -= damage;
                console.log(`${attackingEntity.name} does ${damage} damage to ${victimEntity.name} which now has ${victimEntity.healthPoints} HP left!`);

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
        entity.onDestroy();
    }
}

export default dungeon