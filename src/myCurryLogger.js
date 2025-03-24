function myCurryLogger(fn){
    return function curry(...args){
        if(args.length >=fn.length) {
            return fn(...args)
        }
        return (...more) => curry(...args,...more)
    }
}

module.exports = myCurryLogger;