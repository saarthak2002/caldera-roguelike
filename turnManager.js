const turnManager = {
    interval: 100,
    entities: new Set(),
    lastCall: Date.now(),
    addEntity: (entity) => turnManager.entities.add(entity),
    removeEntity: (entity) => turnManager.entities.remove(entity),
    refresh: () => turnManager.entities.forEach(e => e.refresh()),
    turn: () => {
        let now = Date.now()
        let limit = turnManager.lastCall + turnManager.interval
        if (now > limit) {
            for (let e of turnManager.entities) {
                if (!e.over()) {
                    e.turn()
                    break;
                }
            }
            turnManager.lastCall = Date.now()
        }
    },
    over: () => [...turnManager.entities].every(e => e.over()),
}

export default turnManager;