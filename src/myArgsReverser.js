function myArgsReverser(fn) {
    return function (...args) {
       return  fn(...args.reverse())
    }
}

module.exports = myArgsReverser;