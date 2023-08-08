import dungeon from "./dungeon.js";
import PlayerCharacter from "./player.js";
import turnManager from "./turnManager.js";
import BasicMonster from "./monster.js";

const scene = {
    preload: function() {
        this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
        this.load.spritesheet('tiles', 'assets/tilemap.png', { frameWidth: 16, frameHeight: 16, spacing: 1 });
    },
    create: function() {
        dungeon.initialize(this);
        dungeon.player = new PlayerCharacter(15, 15);
        turnManager.addEntity(dungeon.player);
        turnManager.addEntity(new BasicMonster(70, 8));
        turnManager.addEntity(new BasicMonster(45, 16));
        turnManager.addEntity(new BasicMonster(30, 43));
        turnManager.addEntity(new BasicMonster(27, 43));
    },
    update: function() {
        if(turnManager.over()) {
            turnManager.refresh();
        }
        turnManager.turn();
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