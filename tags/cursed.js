import dungeon from "../dungeon.js";

const cursed = {
    name: "Cursed",
    initialize: function(damage=1, howManyTurns=5) {
        this._curseDamage = damage;
        this._curseTurns = howManyTurns;
        if(this.type === "item") {
            this.tint = 0x002300;
            // if(this.sprite) {
            //     this.sprite.tint = this.tint;
            // }
        }
    },

    turn() {
        if(this.type !== "item") {
            if(this._curseTurns > 0 && !this.curseActivated) {
                this.curseActivated = true;
                this.healthPoints -= this._curseDamage;
                this._curseTurns -= 1;
                dungeon.log(`${this.name} is Cursed! -${this._curseDamage} HP!`);

                if(this._curseTurns == 0) {
                    this.removeTag(cursed);
                }
            }
        }
    },

    refresh() {
        this.curseActivated = false
    },

    damagedEntity(entity) {
        entity.addTag(cursed);
        return entity;
    }
};

export default cursed;