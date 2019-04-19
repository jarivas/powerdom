function stateMap() {
    if (!State.prototype.hasOwnProperty('map'))
        State.prototype.map = new Map()

    return State.prototype.map
}

class State {
    static listen(state, callback) {
        const map = stateMap()

        if (map.has(state)) {
            const callbacks = map.get(state)

            callbacks.push(callback)
        } else {
            map.set(state, [callback])
        }
    }

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

class CountDown {
    static set(key, length, callback) {
        const map = cdMap()

        if (map.has(key))
            return

        map.set(key, {l: length, cb: callback})
    }

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