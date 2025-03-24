
Array.prototype.myFlat = function(arg = 1) {
    if (arg === 0) {
        return [...this]
    }
    if (arg < 0 || !this.length) {
       return  []
    }
    return this.reduce((acc, elem) => {
    if(Array.isArray(elem)) {
        return acc.concat(elem.myFlat(arg -1))
    }
        return acc.concat(elem)
} ,[]).filter(x => !(Array.isArray(x) && x.length === 0))
}

// console.log([[], []].myFlat() ) // []
//
// console.log([1, [2, []], 3].myFlat()) // [1, 2, 3]
//
// console.log([1, [2, [3]]].myFlat(Infinity)) // [1, 2, 3]