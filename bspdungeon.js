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

class DungeonArea {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

function makeTree(area, iterations) {
    let root = new DungeonNode(area);
    if (iterations != 0) {
        let [a1, a2] = splitArea(root.area);
        root.left = makeTree(a1, iterations - 1);
        root.right = makeTree(a2, iterations - 1);
    }
    return root;
}

function splitArea(area) {
    let x1, y1, w1, h1 = 0;
    let x2, y2, w2, h2 = 0;
    if(Phaser.Math.between(0, 1) == 0) {
        let divider = Phaser.Math.Between(1, area.w);
        x1 = area.x;
        y1 = area.y;
        w1 = divider;
        h1 = area.h;
        x2 = area.x + w1;
        y2 = area.y;
        w2 = area.w - w1;
        h2 = area.h;

        if(w1 / h1 < 0.45 || w2 / h2 < 0.45) {
            return splitArea(area);
        }

    }
    else {
        let divider = Phaser.Math.Between(1, area.h);
        x1 = area.x;
        y1 = area.y;
        w1 = area.w;
        h1 = divider;
        x2 = area.x;
        y2 = area.y + h1;
        w2 = area.w;
        h2 = area.h - h1;
        if (h1 / w1 < 0.45 || h2 / w2 < 0.45) {
            return splitArea(area);
        }   
    }

    let a1 = new DungeonArea(x1, y1, w1, h1);
    let a2 = new DungeonArea(x2, y2, w2, h2);

    return [a1, a2];
}

export default class BSPDungeon {
    constructor(width, height, iterations) {
        this.rootArea = new DungeonArea(0, 0, width, height);
        this.tree = makeTree(this.rootArea, iterations);
        this.initializeLevelData();
    }
}