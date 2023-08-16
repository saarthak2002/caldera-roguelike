import dungeon from "../dungeon.js";
import turnManager from "../turnManager.js";
import BasicEnemy from "./basicEnemy.js";
import CursedSceptre from "../items/cursedSceptre.js";
// import { getRandomEnemy } from "../enemies.js"
import BasicMonster from "./cyclops.js";
import Bat from "./bat.js";
import { getRandomTagsForEnemy } from "../tags.js";

const enemies = {
    BasicMonster,
    Bat
}

export default class Necromancer extends BasicEnemy {
    constructor(x, y) {
        super(x, y);
        this.name = `Necromancer`;
        this.movementPoints = 1;
        this.actionPoints = 0;
        this.healthPoints = 1;
        this.refreshRates = {
            movementPoints: 5,
            actionPoints: 3,
            healthPoints: 2
        };
        this.damage = {
            max: 5,
            min: 2 
        };
        this.x = x;
        this.y = y;
        this.tile = 111;
        this.type = "enemy";
        this.active = true;
        this.weapon.name = "dark magic";
        dungeon.initializeEntity(this);
    }

    interact() {
        dungeon.log(`A mysterious figure slumbers peacefully...`);
    }

    onDestroy() {
        dungeon.log(`${this.name} has been destroyed!`);
        dungeon.necromancerScream.play();
        turnManager.addEntity(new CursedSceptre(this.x, this.y));
        // let  monsterCount= 3;
        // while(monsterCount> 0) {
        //     let tile = dungeon.randomWalkableTile()
        //     turnManager.addEntity(getRandomEnemy(tile.x, tile.y));
        //     monsterCount--;
        // }

        let  monsterCount= 3;
        while(monsterCount> 0) {
            let tile = dungeon.randomWalkableTile()
            let key = Phaser.Math.RND.weightedPick(Object.keys(enemies));
            let tags = getRandomTagsForEnemy(1, 1);
            console.log(key);
            console.log(tags);
            turnManager.addEntity(new enemies[key](tile.x, tile.y).addTags(tags));
            monsterCount--;
        }

        // let key = Phaser.Math.RND.weightedPick(Object.keys(enemies));

        dungeon.log(`The Necromancer's curse summoned 3 monsters!`);
        this.UIsprite.setAlpha(0.2);
        this.UItext.setAlpha(0.2);
        this.HPtext.setAlpha(0.2);
        this.HPtext.setText(
            `HP: 0`
        );
        
        dungeon.player.removeItemByProperty('curseOfDeath', true);
    }
}

// export default class Necromancer extends BasicEnemy {
//     constructor(x, y) {
//         this.name = 'Necromancer';
//         this.movementPoints = 1;
//         this.actionPoints = 0;
//         this.healthPoints = 10;

//         this.refreshRates = {
//             movementPoints: 5,
//             actionPoints: 3,
//             healthPoints: 2
//         };
//         this.damage = {
//             max: 5,
//             min: 2 
//         };

//         this.x = x;
//         this.y = y;
//         this.tile = 111;
//         this.type = "npc"
//         this.active = false;
//         dungeon.initializeEntity(this);
//     }

//     interact() {
//         dungeon.log(`A mysterious figure slumbers peacefully...`);
//     }

//     // refresh() {
//     //     this.movementPoints = 5;
//     //     this.actionPoints = 3;
//     // }

//     // turn() {
//     //     let oldX = this.x;
//     //     let oldY = this.y;
//     //     let playerX = dungeon.player.x;
//     //     let playerY = dungeon.player.y;
//     //     let grid = new PF.Grid(dungeon.level);
//     //     let finder = new PF.AStarFinder();
//     //     let path = finder.findPath(oldX, oldY, playerX, playerY, grid);
        
//     //     dungeon.player.items.forEach(item => {
//     //         if (item instanceof CurseOfDeath) {
//     //             this.active = true;
//     //             this.UIsprite.setAlpha(1);
//     //             this.UItext.setAlpha(1);
//     //             this.HPtext.setAlpha(1);
//     //             this.type = 'enemy';
//     //         }
//     //     }) 

//     //     if (this.active) {
//     //         if (this.movementPoints > 0) {
//     //             if (path.length > 2) {
//     //                 dungeon.moveEntityTo(this, path[1][0], path[1][1]);
//     //             }
//     //             this.movementPoints -= 1;
//     //         }
//     //         if (this.actionPoints > 0) {
//     //             if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 4) {
//     //                 dungeon.attackEntity(this, dungeon.player);
//     //             }
//     //             this.actionPoints -= 1;
//     //         }
//     //     }

//     //     else {
//     //         this.movementPoints = 0;
//     //         this.actionPoints = 0;
//     //     }
//     // }

//     // attack() {
//     //     return 1;
//     // }

//     // onDestroy() {
//     //     dungeon.log(`${this.name} has been destroyed!`);
//     //     dungeon.necromancerScream.play();
//     //     turnManager.addEntity(new CursedSceptre(this.x, this.y));
//     //     this.UIsprite.setAlpha(0.2);
//     //     this.UItext.setAlpha(0.2);
//     //     this.HPtext.setAlpha(0.2);
//     //     this.HPtext.setText(
//     //         `HP: 0`
//     //     );
        
//     //     dungeon.player.removeItemByProperty('curseOfDeath', true);
//     // }

//     // over() {
//     //     let isOver = this.movementPoints == 0 && this.actionPoints == 0 && !this.moving;

//     //     if (isOver && this.UItext) {
//     //         this.UItext.setColor('#cfc6b8')
//     //     }
//     //     else {
//     //         this.UItext.setColor('#50C878')
//     //     }
//     //     if (this.HPtext) {
//     //         this.HPtext.setText(
//     //             `HP: ${this.healthPoints}`
//     //         );
//     //     }
        
//     //     return isOver;
//     // }

//     // createUI(config) {
//     //     let scene = config.scene;
//     //     let x = config.x;
//     //     let y = config.y;

//     //     this.UIsprite = scene.add.sprite(x, y, 'tiles', this.tile).setOrigin(0);
//     //     this.UItext = scene.add.text(x + 20, y, this.name, { font: '16px arcade', fill: '#cfc6b8' });
//     //     this.HPtext = scene.add.text(x + 20, y + 15, `HP: ${this.healthPoints}`, { font: '9px Arial', fill: '#a8a196' });

//     //     this.UIsprite.setAlpha(0);
//     //     this.UItext.setAlpha(0);
//     //     this.HPtext.setAlpha(0);
//     //     return 30;
//     // }

//     // protection() {
//     //     return 0;
//     // }
// }