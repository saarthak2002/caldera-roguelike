// import dungeon from "../dungeon.js";

// const activateOnDeathCurse = {
//     name: "Death Curse",
//     initialize: function() {
//         console.log('init here');
//         if(this.type === "enemy") {
//             console.log(`Death curse`);
//         }
//     },

//     turn() {
//         console.log('here 3');
//         let oldX = this.x;
//         let oldY = this.y;
//         let playerX = dungeon.player.x;
//         let playerY = dungeon.player.y;
//         let grid = new PF.Grid(dungeon.level);
//         let finder = new PF.AStarFinder();
//         let path = finder.findPath(oldX, oldY, playerX, playerY, grid);
//         console.log('here 1');
//         dungeon.player.items.forEach(item => {
//             if (item.name === 'Curse of Death' ) {
//                 console.log('here 2');
//                 this.active = true;
//                 this.UIsprite.setAlpha(1);
//                 this.UItext.setAlpha(1);
//                 this.HPtext.setAlpha(1);
//                 this.type = 'enemy';
//             }
//         }) 

//         if (this.active) {
//             console.log('here 3');
//             if (this.movementPoints > 0) {
//                 if (path.length > 2) {
//                     dungeon.moveEntityTo(this, path[1][0], path[1][1]);
//                 }
//                 this.movementPoints -= 1;
//             }
//             if (this.actionPoints > 0) {
//                 if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 4) {
//                     dungeon.attackEntity(this, dungeon.player);
//                 }
//                 this.actionPoints -= 1;
//             }
//         }

//         else {
//             console.log('here 4');
//             this.movementPoints = 0;
//             this.actionPoints = 0;
//         }
//     },
// }

import dungeon from "../dungeon.js";

const activateOnDeathCurse = {
    name: "Death Curse",
    initialize: function() {
        if(this.type === "enemy") {
            this.tint = 0xdd0000;

            if(this.sprite) {
                this.sprite.tint = this.tint;
            }
        }
    },

    turn() {
        console.log('here 3');
        let oldX = this.x;
        let oldY = this.y;
        let playerX = dungeon.player.x;
        let playerY = dungeon.player.y;
        let grid = new PF.Grid(dungeon.level);
        let finder = new PF.AStarFinder();
        let path = finder.findPath(oldX, oldY, playerX, playerY, grid);
        console.log('here 1');
        dungeon.player.items.forEach(item => {
            if (item.name === 'Curse of Death' ) {
                console.log('here 2');
                this.active = true;
                this.UIsprite.setAlpha(1);
                this.UItext.setAlpha(1);
                this.HPtext.setAlpha(1);
                this.type = 'enemy';
            }
        }) 

        // if (this.active) {
            console.log('here 3');
            if (this.movementPoints > 0) {
                if (path.length > 2) {
                    dungeon.moveEntityTo(this, path[1][0], path[1][1]);
                }
                this.movementPoints -= 1;
            }
            if (this.actionPoints > 0) {
                if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 4) {
                    dungeon.attackEntity(this, dungeon.player);
                }
                this.actionPoints -= 1;
            }
        // }

        // else {
        //     console.log('here 4');
        //     this.movementPoints = 0;
        //     this.actionPoints = 0;
        // }
    },

    refresh() {
        if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 5) {
            dungeon.log(`${this.name} is approaching!`)
        }
    }
}

export default activateOnDeathCurse;