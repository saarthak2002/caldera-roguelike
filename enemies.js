import BasicMonster from "./enemies/cyclops.js";
import Bat from "./enemies/bat.js";
import Slime from "./enemies/slime.js";
import Troll from "./enemies/troll.js";
import WizLord from "./enemies/wizard.js";
import Necromancer from "./enemies/necromancer.js";

const enemies = {
    BasicMonster,
    Bat,
    Slime,
    Troll,
    WizLord,
    Necromancer
}

export default enemies;

export function getRandomEnemy(x, y, modifierCount = 1, effectCount = 1) {
    let key = Phaser.Utils.Array.GetRandom(Object.keys(enemies));
    let tags = getRandomTagsForEnemy(modifierCount, effectCount);
    return new enemies[key](x, y).addTags(tags);
}

