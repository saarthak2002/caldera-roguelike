const scene = {
    preload: function() {
        this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
    },
    create: function() {
        this.helloText = this.add.bitmapText(400,300,'arcade', 'Hello World').setOrigin(0.5);
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