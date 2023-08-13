import Axe from "./items/axe.js";
import BasicSword from "./items/basicSword.js";
import BlessingPotion from "./items/blessingPotion.js";
import Bow from "./items/bow.js";
import CursedSceptre from "./items/cursedSceptre.js";
import Hammer from "./items/hammer.js";
import HealingPotion from "./items/healingPotion.js";
import IncantationOfFire from "./items/incantationOfFire.js";
import IncantationOfLightning from "./items/incantationOfLightning.js";
import LessserHealingPotion from "./items/lesserHealingPotion.js";
import SharpDagger from "./items/sharpDagger.js";
import Shield from "./items/shield.js";
import SoldiersShield from "./items/soldiersShield.js";
import Broadsword from "./items/broadSword.js";
import { getRandomTagsForItem } from "./tags.js";

const items = {
    Axe,
    BasicSword,
    BlessingPotion,
    Bow,
    CursedSceptre,
    Hammer,
    HealingPotion,
    IncantationOfFire,
    IncantationOfLightning,
    LessserHealingPotion,
    SharpDagger,
    Shield,
    SoldiersShield,
    Broadsword
}

export default items;

export function getRandomItem(x, y, modifierCount = 1, effectCount = 1) {
    let key = Phaser.Utils.Array.GetRandom(Object.keys(items));
    let tags = getRandomTagsForItem(modifierCount, effectCount);
    return new items[key](x, y).addTags(tags);
}