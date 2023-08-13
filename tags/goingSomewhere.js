import dungeon from "../dungeon.js";

const goingSomewhere = {
    name: "Going Somewhere",
    initialize: function() {
        if(this.type === "enemy") {
            this.tint = 0xdd0000;

            if(this.sprite) {
                this.sprite.tint = this.tint;
            }
        }
    },

    turn() {
        let oldX = this.x;
        let oldY = this.y;
        let destinationX = this._destinationX;
        let destinationY = this._destinationY;

        if(!destinationX || !destinationY) {
            let randomCoords = dungeon.randomWalkableTile();
            this._destinationX = randomCoords.x;
            this._destinationY = randomCoords.y;
            destinationX = this._destinationX;
            destinationY = this._destinationY;
        }

        if(oldX == destinationX && oldY == destinationY) {
            let randomCoords = dungeon.randomWalkableTile();
            this._destinationX = randomCoords.x;
            this._destinationY = randomCoords.y;
            destinationX = this._destinationX;
            destinationY = this._destinationY;
        }
        console.log(`${this.name} is going to ${destinationX}, ${destinationY}`);

        let grid = new PF.Grid(dungeon.level);
        let finder = new PF.AStarFinder();
        let path = finder.findPath(oldX, oldY, destinationX, destinationY, grid);

        if (this.movementPoints > 0) {
            if (path.length > 1) {
                dungeon.moveEntityTo(this, path[1][0], path[1][1]);
            }
            this.movementPoints -= 1;
        }

        if(dungeon.distanceBetweenEntities(this, dungeon.player) <= 5) {
            this._destinationX = dungeon.player.x;
            this._destinationY = dungeon.player.y;
        }

        if (this.actionPoints > 0) {
            if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 2) {
                dungeon.attackEntity(this, dungeon.player, this.weapon);
            }
            this.actionPoints -= 1;
        }
    },

    refresh() {
        if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 5) {
            dungeon.log(`${this.name} is approaching!`)
        }
    }
}

export default goingSomewhere;