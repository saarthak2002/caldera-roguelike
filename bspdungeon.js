class DungeonNode {
    constructor(area) {
        this.left = false;
        this.right = false;
        this.area = area;
    }

    forEachArea(f) {
        f(this.area);
        if(this.left) {
            this.left.forEachArea(f);
        }
        else {
            this.right.forEachArea(f);
        }
    }
}