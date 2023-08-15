const royal = {
    name: 'Royal',
    initialize: function() {
        if(this.type === 'enemy') {
            this.tint =  0xccbc00;
            this.refreshRates.actionPoints += 2;
            this.refreshRates.movementPoints += 2;
            this.refreshRates.healthPoints += 2;

            // if(this.sprite) {
            //     this.sprite.tint = this.tint;
            // }

            this.name = `Royal ${this.name}`;
        }
    }
}

export default royal;