import dungeon from "./dungeon.js";

export default class BasicMonster {
    constructor(x, y) {
        this.name = 'A Weak Monster';
        this.movementPoints = 1;
        this.actionPoints = 1;
        this.healthPoints = 3;
        this.x = x;
        this.y =y;
        this.tile = 109;
        dungeon.initializeEntity(this);
    }
    refresh() {
        this.movementPoints = 1;
        this.actionPoints = 1;
    }

    turn() {
        let oldX = this.x;
        let oldY = this.y;
        let playerX = dungeon.player.x;
        let playerY = dungeon.player.y;
        let grid = new PF.Grid(dungeon.level);
        let finder = new PF.AStarFinder();
        let path = finder.findPath(oldX, oldY, playerX, playerY, grid);

        if(this.movementPoints > 0) {
            if(path.length > 2) {
                dungeon.moveEntityTo(this, path[1][0], path[1][1]);
            }
            this.movementPoints -= 1;
        }

        if(this.actionPoints > 0) {
            if(dungeon.distanceBetweenEntities(this, dungeon.player) <= 2) {
                dungeon.attackEntity(this, dungeon.player);
            }
            this.actionPoints -= 1;
        }
    }

    attack() {
        return 1;
    }

    onDestroy() {
        console.log(`${this.name} has been destroyed!`);
    }

    over() {
        return this.movementPoints == 0 && this.actionPoints == 0 && !this.moving;
    }
}