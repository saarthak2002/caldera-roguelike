import dungeon from "./dungeon.js";
import PlayerCharacter from "./player.js";

const scene = {
    preload: function() {
        this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
        this.load.spritesheet('tiles', 'assets/tilemap.png', { frameWidth: 16, frameHeight: 16, spacing: 1 });
    },
    create: function() {
        dungeon.initialize(this);
        let player = new PlayerCharacter(15, 15);
    },
    update: function() {

    }
}

const config = {
    type: Phaser.AUTO,
    width: 80 * 16,
    height: 50 * 16,
    backgroundColor: '#000000',
    parent: 'game',
    pixelArt: true,
    zoom: 1,
    scene: scene,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    }
}

const game = new Phaser.Game(config)