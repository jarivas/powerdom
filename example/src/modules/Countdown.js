function cdMap() {
    if (!Countdown.prototype.hasOwnProperty('map'))
        Countdown.prototype.map = new Map()

    return Countdown.prototype.map
}

/**
 * It is used to trigger a callback after a number of times is called
 */
class Countdown {

    /**
     * Set the Countdown
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

export default Countdown