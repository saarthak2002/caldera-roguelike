import aggro from "./tags/aggro.js";
import fast from "./tags/fast.js";
import golden from "./tags/golden.js";
import silver from "./tags/silver.js";
import iron from "./tags/iron.js";
import royal from "./tags/royal.js";
import burning from "./tags/burning.js";
import poisonous from "./tags/poisonous.js";
import cursed from "./tags/cursed.js";

import hunter from "./tags/hunter.js";
import goingSomewhere from "./tags/goingSomewhere.js";
import patrolling from "./tags/patrolling.js";

import activateOnDeathCurse from "./tags/activateOnDeathCurse.js";

const tags = {
    aggro,
    fast,
    golden,
    silver,
    iron,
    royal,
    burning,
    poisonous,
    cursed,
    hunter,
    goingSomewhere,
    patrolling,
    // activateOnDeathCurse
};

export const materials = [
    "golden",
    "silver",
    "iron",
];

export const enemyModifiers = [
    "aggro",
    "fast",
    "royal",
];

export const behaviors = [
    "goingSomewhere",
    "patrolling",
    "hunter",
];

export const effects = [
    "burning",
    "poisonous",
    "cursed",
]

export function getRandomTagsForItem(modifierCount=1, effectCount=0) {
    let result = new Set();
    while(modifierCount > 0) {
        result.add(Phaser.Utils.Array.GetRandom(materials));
        modifierCount -= 1;
    }
    while(effectCount > 0) {
        result.add(Phaser.Utils.Array.GetRandom(effects));
        effectCount -= 1;
    }
    return [...result];
}

export function getRandomTagsForEnemy(modifierCount = 1) {
    let res = new Set();
    while (modifierCount > 0) {
        res.add(Phaser.Utils.Array.GetRandom(enemyModifiers));
        modifierCount--;
    }
    res.add(Phaser.Utils.Array.GetRandom(behaviors));
    return [...res];
}

export function getNecromancerTags() {
    let res = new Set();
    // res.add(Phaser.Utils.Array.GetRandom(enemyModifiers));
    res.add(activateOnDeathCurse);
    return [...res];
}

export default tags;