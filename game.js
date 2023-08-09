import ui from "./ui.js";
import world from "./world.js";

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 80 * 16,
        height: 50 * 16,
    },
    backgroundColor: '#763B36',
    pixelArt: true,
    zoom: 1,
    scene: [world, ui],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    }
}

const game = new Phaser.Game(config)