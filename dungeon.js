import level from "./level.js"

let dungeon = {
    sprites: {
        floor: 0,
        wall: 14,
    },
    initialize: function (scene) {
        this.scene = scene;
        scene.level = level.map(r => r.map(t => t == 1 ? this.sprites.wall : this.sprites.floor));

        const tileSize = 16
        const config = {
            data: scene.level,
            tileWidth: tileSize,
            tileHeight: tileSize,
        }
        const map = scene.make.tilemap(config);
        const tileset = map.addTilesetImage('tiles', 'tiles', tileSize, tileSize, 0, 1);
        this.map = map.createLayer(0, tileset, 0, 0);
    }
}

export default dungeon