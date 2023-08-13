import dungeon from "../dungeon.js";

const silver = {
    name: "Silver",
    initialize: function() {
        this.name = `Sliver ${this.name}`;
        this.tint = 0xccbc00;
        if(this.sprite) {
            this.sprite.tint = this.tint;
        }
        if(this.type == "item") {
            this.equpipHPBonus = 2;
        }
    },
    equip(acc, itemNumber, entity) {
        if (this.equipHPBonus > 0) {
            dungeon.log(`+${this.equipHPBonus} HP bonus for equipping silver item.`);
            entity.healthPoints += this.equipHPBonus;
            this.equipHPBonus = 0;
        } 
    },
};

export default silver;