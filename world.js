import dungeon from "./dungeon.js";
import BSPDungeon from "./bspdungeon.js";
import turnManager from "./turnManager.js";
import classes from "./classes.js";

import { getRandomItem } from "./items.js"
import { getRandomEnemy } from "./enemies.js"




const world = {
    key: 'world-scene',
    active: true,
    preload: function () {
        this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
        this.load.spritesheet('tiles', 'assets/tilemap.png', { frameWidth: 16, frameHeight: 16, spacing: 1 });
        this.load.audio('music', 'assets/audio/game_music.mp3');
        this.load.audio('attack', 'assets/audio/hit-delay.mp3');
        this.load.audio('magicAttack', 'assets/audio/magic_attack.mp3');
        this.load.audio('heal', 'assets/audio/heal.mp3');
        this.load.audio('upgrade', 'assets/audio/upgrade.mp3');
        this.load.audio('pickup', 'assets/audio/Rise02.mp3');
        this.load.audio('necromancer', 'assets/audio/necro_scream.mp3');
        this.load.audio('massiveHit', 'assets/audio/massiveHit.mp3');
        this.load.audio('footseps', 'assets/audio/footstep09.ogg');
        this.load.audio('gameover', 'assets/audio/gameover.mp3');
    },
    create: function () {

        let dungeonGenerator = new BSPDungeon(80, 50, 4);
        let level = dungeonGenerator.toLevelData();
        dungeon.initialize(this, level);

        // const archtypes = [classes.Warrior, classes.Sorcerer, classes.Elf, classes.Cleric, classes.Dwarf];
        // const player =archtypes[Math.floor(Math.random() * archtypes.length)]

        // dungeon.player = new player(15, 15);
        // dungeon.attackSound = this.sound.add('attack');
        // dungeon.upgradeSound = this.sound.add('upgrade');
        // dungeon.magicAttackSound = this.sound.add('magicAttack');
        // dungeon.healSound = this.sound.add('heal');
        // dungeon.pickupSound = this.sound.add('pickup');
        // dungeon.necromancerScream = this.sound.add('necromancer');
        // dungeon.massiveHit = this.sound.add('massiveHit');
        // dungeon.footsteps = this.sound.add('footseps');
        // dungeon.gameover = this.sound.add('gameover');

        // turnManager.addEntity(dungeon.player);
        // let  monsterCount= 10;
        // while(monsterCount> 0) {
        //     let tile = dungeon.randomWalkableTile();
        //     turnManager.addEntity(getRandomEnemy(tile.x, tile.y));
        //     monsterCount--;
        // }
        // let itemCount = 10;
        // while(itemCount > 0) {
        //     let tile = dungeon.randomWalkableTile();
        //     turnManager.addEntity(getRandomItem(tile.x, tile.y));
        //     itemCount--;
        // }

        let camera = this.cameras.main;
        camera.setViewport(0, 0, camera.worldView.width - 200, camera.worldView.height);
        camera.setBounds(0, 0, camera.worldView.width, camera.worldView.height);
        // camera.startFollow(dungeon.player.sprite);
        // this.events.emit('createUI');

        dungeonGenerator.tree.forEachArea(area => {
            let x = dungeon.map.tileToWorldX(area.x);
            let y = dungeon.map.tileToWorldY(area.y);
            let w = area.w * 16;
            let h = area.h * 16;
            this.add.rectangle(x, y, w, h).setStrokeStyle(4, 0xff0000, 1, 0.7).setOrigin(0);
        });

        ///////////////// MUSIC ////////////////////
        this.scene.get('world-scene').events.on('gameover', () => {
            console.log('Game over');
            this.music.stop();
        });
        this.music = this.sound.add('music');
        let musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        let isMusicPlaying = localStorage.getItem('isMusicPlaying') ? (localStorage.getItem('isMusicPlaying') === 'true' ? true : false) : true ;
        console.log(isMusicPlaying);
        console.log(typeof isMusicPlaying);
        let wasPlayedOnLoad = false;
        if(isMusicPlaying) {
            this.music.play(musicConfig);
            wasPlayedOnLoad = true;
        }
        const toggleMusic = () => {
            if (isMusicPlaying) {
                this.music.pause();
                localStorage.setItem('isMusicPlaying', false);
                this.musicButton.setText(
                    `Music: Off`
                );
            } else {
                if(wasPlayedOnLoad) {
                    this.music.resume();
                    localStorage.setItem('isMusicPlaying', true);
                    this.musicButton.setText(
                        `Music: On`
                    );
                }
                else {
                    this.music.play(musicConfig);
                    localStorage.setItem('isMusicPlaying', true);
                    this.musicButton.setText(
                        `Music: On`
                    );
                }
            }
            isMusicPlaying = !isMusicPlaying;
        }

        this.musicButton = this.add.text(
            10,
            10,
            `Music: ${isMusicPlaying ? 'On' : 'Off'}`, 
            {
                font: '16px Arial',
                color: '#ffffff',
            },
        )
        .setInteractive()
        .on('pointerdown', () => {
            console.log('clicked');
            toggleMusic();
        });
        this.musicButton.fixedToCamera = true;
        this.musicButton.setScrollFactor(0);
        ///////////////// MUSIC ////////////////////
    },

    update: function () {
        // if (turnManager.over()) {
        //     turnManager.refresh();
        // }
        // turnManager.turn();
    },
}

export default world;
