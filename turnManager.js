const turnManager = {
    entities: new Set(),
    addEntity: (entity) => turnManager.entities.add(entity),
    removeEntity: (entity) => turnManager.entities.remove(entity),
    refresh: () => {
        turnManager.entities.forEach(e => e.refresh());
        turnManager.currentIndex = 0;
    },
    currentIndex: 0,
    turn: () => {
        if(turnManager.entities.size > 0) {
            let entities = [...turnManager.entities];
            let entity = entities[turnManager.currentIndex];
            if(!entity.over()) {
                entity.turn();
            }
            else {
                turnManager.currentIndex += 1;
            }
        }
    },
    over: () => [...turnManager.entities].every(e => e.over()),
}

export default turnManager;