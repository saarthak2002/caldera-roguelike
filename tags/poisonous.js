import dungeon from "../dungeon.js";

const poisonous = {
    name: "Poisonous",
    initialize: function(damage=1, howManyTurns=8) {
        this._poisonDamage = damage;
        this._poisonTurns = howManyTurns;
        if(this.type === "item") {
            this.tint = 0x002300;
            if(this.sprite) {
                this.sprite.tint = this.tint;
            }
        }
    },

    turn() {
        if(this.type !== "item") {
            if(this._poisonTurns > 0 && !this.poisonActivated) {
                this.poisonActivated = true;
                this.healthPoints -= this._poisonDamage;
                this._poisonTurns -= 1;
                dungeon.log(`${this.name} is poisoned! -${this._poisonDamage} HP!`);

                if(this._poisonTurns == 0) {
                    this.removeTag(poisonous);
                }
            }
        }
    },

    refresh() {
        this.poisonActivated = false
    },

    damagedEntity(entity) {
        entity.addTag(poisonous);
        return entity;
    }
};

export default poisonous;