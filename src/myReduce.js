Array.prototype.myReduce = function (callback, initialValue) {
    if(!this.length && !initialValue) {
        throw new TypeError('invalid');
    }
    const hasInitialValue = initialValue !== undefined
    let acc = hasInitialValue ? initialValue : undefined

    this.forEach((elem, i, arr) => {
    if(acc === undefined) {
        acc = elem
    } else {
        acc = callback(acc, elem, i , arr)
    }
})
    if(acc === undefined) {
        throw TypeError();
    }
    return acc
}
