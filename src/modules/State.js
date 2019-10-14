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
     * @param {object} data
     */
    static fire(state, data) {
        const map = stateMap()

        if (!map.has(state))
            return

        map.get(state).forEach(callback => callback(data))
        map.delete(state)
    }
}

export default State