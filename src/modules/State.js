const stateMap = new Map()

class State {
    static listen(state, callback){
        if(stateMap.has(state)){
            const callbacks = stateMap.get(state)

            callbacks.push(callback)
        } else {
            stateMap.set(state, [callback])
        }
    }

    static fire(state){
        if(!stateMap.has(state))
            return

        stateMap.get(state).forEach(callback => callback())
        stateMap.delete(state)
    }
}

export default State