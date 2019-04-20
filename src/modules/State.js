function stateMap() {
    if (!State.prototype.hasOwnProperty('map'))
        State.prototype.map = new Map()

    return State.prototype.map
}

/**
 * A Class to hold states and its callbacks
 */
class State {
    /**
     * set the listener
     * @param {string} state 
     * @param {function} callback 
     */
    static listen(state, callback) {
        const map = stateMap()

        if (map.has(state)) {
            const callbacks = map.get(state)

            callbacks.push(callback)
        } else {
            map.set(state, [callback])
        }
    }

    /**
     * Triggers the listener
     * @param {string} state 
     */
    static fire(state) {
        const map = stateMap()

        if (!map.has(state))
            return

        map.get(state).forEach(callback => callback())
        map.delete(state)
    }
}

function cdMap() {
    if (!CountDown.prototype.hasOwnProperty('map'))
        CountDown.prototype.map = new Map()

    return CountDown.prototype.map
}

/**
 * It is used to trigger a callback after a numer of times is called
 */
class CountDown {

    /**
     * Set the countdown
     * @param {string} key 
     * @param {int} length 
     * @param {function} callback 
     */
    static set(key, length, callback) {
        const map = cdMap()

        if (map.has(key))
            return

        map.set(key, {l: length, cb: callback})
    }

    /**
     * Reduce the number of times to be called in one
     * @param {string} key 
     */
    static decrease(key) {
        const map = cdMap()

        if (!map.has(key))
            return

        const state = map.get(key)

        if(state.l > 0){
            --state.l
            map.set(key, state)

            if(state.l == 0)
                state.cb()
        }
    }
}

export {
    State,
    CountDown
}