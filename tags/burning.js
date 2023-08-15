import dungeon from "../dungeon.js";

const burning = {
    name: "Burning",
    initialize: function(damage=2, howManyTurns=3) {
        this._burningDamage = damage;
        this._burningTurns = howManyTurns;
        if(this.type === "item") {
            this.tint = 0x002300;
            // if(this.sprite) {
            //     this.sprite.tint = this.tint;
            // }
        }
    },

    turn() {
        if(this.type !== "item") {
            if(this._burningTurns > 0 && !this.burningActivated) {
                this.burningActivated = true;
                this.healthPoints -= this._burningDamage;
                this._burningTurns -= 1;
                dungeon.log(`${this.name} is burning! -${this._burningDamage} HP!`);

                if(this._burningTurns == 0) {
                    this.removeTag(burning);
                }
            }
        }
    },

    refresh() {
        this.burningActivated = false
    },

    damagedEntity(entity) {
        entity.addTag(burning);
        return entity;
    }
};

export default burning;