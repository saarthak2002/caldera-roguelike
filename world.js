import dungeon from "./dungeon.js";
import PlayerCharacter from "./player.js";
import turnManager from "./turnManager.js";

import BasicMonster from "./enemies/cyclops.js";

import WizLord from "./enemies/wizard.js";
import wizardAltar from "./structures/wizardAltar.js";

import Blacksmith from "./npcs/blacksmith.js";
import blacksmithShop from "./structures/blacksmithShop.js";
import GraveSpirit from "./npcs/gravespirit.js";

import HealingPotion from "./items/healingPotion.js";
import SharpDagger from "./items/sharpDagger.js";
import Necromancer from "./enemies/necromancer.js";
import Bat from "./enemies/bat.js";

import classes from "./classes.js";

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
        dungeon.initialize(this);
        dungeon.player = new classes.Elf(15, 15);
        dungeon.create3by3Structure(35, 6, wizardAltar);
        dungeon.create3by3Structure(45, 16, blacksmithShop);
        dungeon.attackSound = this.sound.add('attack');
        dungeon.upgradeSound = this.sound.add('upgrade');
        dungeon.magicAttackSound = this.sound.add('magicAttack');
        dungeon.healSound = this.sound.add('heal');
        dungeon.pickupSound = this.sound.add('pickup');
        dungeon.necromancerScream = this.sound.add('necromancer');
        dungeon.massiveHit = this.sound.add('massiveHit');
        dungeon.footsteps = this.sound.add('footseps');
        dungeon.gameover = this.sound.add('gameover');

        turnManager.addEntity(dungeon.player);
        turnManager.addEntity(new BasicMonster(70, 8));
        turnManager.addEntity(new BasicMonster(45, 21));
        turnManager.addEntity(new BasicMonster(30, 43));
        turnManager.addEntity(new BasicMonster(70, 40));
        turnManager.addEntity(new WizLord(35, 6));
        turnManager.addEntity(new Blacksmith(46, 16));
        turnManager.addEntity(new Bat(20, 11));
        turnManager.addEntity(new Bat(53, 33));
        turnManager.addEntity(new Bat(55, 31));

        turnManager.addEntity(new HealingPotion(30, 43));
        turnManager.addEntity(new SharpDagger(54, 32));

        turnManager.addEntity(new GraveSpirit(28, 43));
        turnManager.addEntity(new Necromancer(57, 32));

        let camera = this.cameras.main;
        camera.setViewport(0, 0, camera.worldView.width - 200, camera.worldView.height);
        camera.setBounds(0, 0, camera.worldView.width, camera.worldView.height);
        camera.startFollow(dungeon.player.sprite);
        this.events.emit('createUI');

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
    },

    update: function () {
        if (turnManager.over()) {
            turnManager.refresh();
        }
        turnManager.turn();
    },
}

export default world;
