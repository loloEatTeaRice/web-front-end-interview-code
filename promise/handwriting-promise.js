class Commitment {
    static PENGING = 'pengding'
    static FULFILLED = 'success'
    static REJECTED = 'reject'

    constructor (func) {
        this.status = Commitment.PENGING
        this.result = null
        this.resolveCallbacks = []
        this.rejectCallbacks = []
        try {
            func(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }

    }

    resolve (result) {
        setTimeout(() => {
            if (this.status === Commitment.PENGING) {
                this.status = Commitment.FULFILLED
                this.result = result
                this.resolveCallbacks.forEach(callback => {
                    callback(result)
                })
            }
        })
    }
    reject (result) {
        setTimeout(() => {
            if (this.status === Commitment.PENGING) {
                this.status = Commitment.REJECTED
                this.result = result
                this.rejectCallbacks.forEach(callback => {
                    callback(result)
                })
            }
        })
    }

    then (onFULFILLED, onREJECTED) {
        return new Commitment((resolve, reject) => {
            onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => { }
            onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => { }
            if (this, this.status === Commitment.PENGING) {
                this.resolveCallbacks.push(onFULFILLED)
                this.rejectCallbacks.push(onREJECTED)
            }
            if (this.status === Commitment.FULFILLED) {
                setTimeout(() => {
                    onFULFILLED(this.result)
                })
            }
            if (this.status === Commitment.REJECTED) {
                setTimeout(() => {
                    onREJECTED(this.result)
                })
            }
        })
    }
}

let commitment = new Commitment((resolve, reject) => {
    // resolve('下次一定')
    // reject('下次不一定')
    throw new Error('hahahaha')
}).then(
    result => { console.log(result); },
    result => { console.log(result.message); }
)