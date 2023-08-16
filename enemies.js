import BasicMonster from "./enemies/cyclops.js";
import Bat from "./enemies/bat.js";
import Slime from "./enemies/slime.js";
import Troll from "./enemies/troll.js";
import WizLord from "./enemies/wizard.js";
import Necromancer from "./enemies/necromancer.js";
import { getRandomTagsForEnemy } from "./tags.js";

const enemies = {
    BasicMonster,
    BasicMonster,
    BasicMonster,
    Bat,
    Bat,
    Bat,
    Slime,
    Slime,
    Troll,
    Troll,
    WizLord,
    WizLord,
    Necromancer
}

export default enemies;

export function getRandomEnemy(x, y, modifierCount = 1, effectCount = 1) {
    let key = Phaser.Math.RND.weightedPick(Object.keys(enemies));
    let tags = [];
    tags = getRandomTagsForEnemy(modifierCount, effectCount);
    return new enemies[key](x, y).addTags(tags);
}

