import dungeon from "./dungeon.js";

export default class BasicMonster {
    constructor(x, y) {
        this.movementPoints = 0;
        this.x = x;
        this.y =y;
        this.tile = 109;
        dungeon.initializeEntity(this);
    }
    refresh() {
        this.movementPoints = 1;
    }

    turn() {
        let oldX = this.x;
        let oldY = this.y;

        if(this.movementPoints > 0) {
            let playerX = dungeon.player.x;
            let playerY = dungeon.player.y;
            let grid = new PF.Grid(dungeon.level);
            let finder = new PF.AStarFinder();
            let path = finder.findPath(oldX, oldY, playerX, playerY, grid);

            if(path.length > 2) {
                dungeon.moveEntityTo(this, path[1][0], path[1][1]);
            }

            this.movementPoints -= 1;
        }
    }

    over() {
        return this.movementPoints == 0 && !this.moving;
    }
}