import dungeon from "./dungeon.js";
import turnManager from "./turnManager.js";

const ui = {
    key: 'ui-scene',
    active: true,
    create: function() {
        this.createdUI = false;

        const backgroundColor = this.add.graphics();
        backgroundColor.fillStyle(0x333333, 1); // Replace with your desired color value
        backgroundColor.fillRect((80 * 16)-200, 0, 200, 50 * 16);

        this.scene.get('world-scene').events.on(
            'createUI',
            () => {
                let iterator = turnManager.entities.values();
                let x = (80 * 16) - 190;
                let y = 10;
                for(let entity of iterator) {
                    if( typeof entity.createUI === 'function') {
                        let height = entity.createUI({
                            scene: this,
                            x,
                            y,
                            width: 198
                        });
                        y += height;
                    }
                }
                this.add.line(x+5, y, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0)
                this.log = this.add.text(x+10, y+20, "", {
                    font: '16px arcade',
                    color: '#cfc6b8',
                    wordWrap: {
                        width: 180 
                    }
                })
                this.createdUI = true;
            },
        )
    },
    update: function() {
        if(this.createdUI) {
            let text = dungeon.messages.join(`\n\n`);
            this.log.setText(text);
        }
    }
}

export default ui;