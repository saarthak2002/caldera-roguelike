import GenericItem from "./genericItem.js";
import dungeon from "../dungeon.js";

export default class AttackPotion extends GenericItem {
    constructor(x, y) {
        super(x,y);
        this.tile = 116;
        this.name = 'Strength Potion';
        this.description = 'A potion that makes you stronger';
        this.weapon = false;

        dungeon.initializeEntity(this);
    }
    
    equip(itemNumber) {
        dungeon.healSound.play();
        dungeon.log(`${dungeon.player.name} feels stronger!`);
        dungeon.player.addAttackBuff(Phaser.Math.Between(1, 3));
        dungeon.player.removeItem(itemNumber);
    }
}