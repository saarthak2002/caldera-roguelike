import dungeon from "./dungeon.js";
import PlayerCharacter from "./player.js";
import turnManager from "./turnManager.js";

import BasicMonster from "./monster.js";

import WizLord from "./wizard.js";
import wizardAltar from "./wizardAltar.js";

import Blacksmith from "./blacksmith.js";
import blacksmithShop from "./blacksmithShop.js";

import Bat from "./bat.js";


const scene = {
    preload: function() {
        this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
        this.load.spritesheet('tiles', 'assets/tilemap.png', { frameWidth: 16, frameHeight: 16, spacing: 1 });
    },
    create: function() {
        dungeon.initialize(this);
        dungeon.player = new PlayerCharacter(15, 15);
        dungeon.create3by3Structure(35, 6, wizardAltar);
        dungeon.create3by3Structure(45, 16, blacksmithShop);
        turnManager.addEntity(dungeon.player);
        turnManager.addEntity(new BasicMonster(70, 8));
        turnManager.addEntity(new BasicMonster(45, 21));
        turnManager.addEntity(new BasicMonster(30, 43));
        turnManager.addEntity(new BasicMonster(27, 43));
        turnManager.addEntity(new WizLord(35, 6));
        turnManager.addEntity(new Blacksmith(46, 16));
        turnManager.addEntity(new Bat(20, 11));
        turnManager.addEntity(new Bat(53, 33));
        turnManager.addEntity(new Bat(55, 31));
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
    backgroundColor: '#763B36',
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