class State {
    static getMap() {
        if(!State.prototype.hasOwnProperty('map'))
            State.prototype.map = new Map()
        
        return State.prototype.map
    }

    static listen(state, callback){
        const stateMap = State.getMap()

        if(stateMap.has(state)){
            const callbacks = stateMap.get(state)

            callbacks.push(callback)
        } else {
            stateMap.set(state, [callback])
        }
    }

    static fire(state){
        const stateMap = State.getMap()

        if(!stateMap.has(state))
            return

        stateMap.get(state).forEach(callback => callback())
        stateMap.delete(state)
    }
}

export default State