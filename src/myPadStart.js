String.prototype.myPadStart = function (targetLength, padString=' ') {
    let result = ''

    if(typeof targetLength !== 'number' || typeof padString !== 'string') {
        throw TypeError()
    }
    if(targetLength <= this.length){
        return String(this)
    }
    if(padString === '') {
        padString = ' '
    }
    const fillLength = targetLength -this.length

    while(result.length < fillLength) {
        result += padString
    }
    return result.slice(0, fillLength) + String(this)
}


// String.prototype.myPadStart = function (targetLength, padString = ' ') {
//     if(typeof targetLength !== 'number' || typeof padString !== 'string') {
//         throw TypeError()
//     }
//
//     if(targetLength <= this.length) {
//         return String(this)
//     }
//
//     if(padString === '') {
//         padString = ' '
//     }
//
//     const fillLength = targetLength - this.length
//     let result = ''
//
//     while(fillLength > result.length) {
//         result += padString
//     }
//
//     return result.slice(0, fillLength) + String(this)
//
// }

// String.prototype.myPadStart = function(targetLength, padString = ' '){
//     if(typeof targetLength !== 'number' || typeof padString !== 'string') {
//         throw TypeError()
//     }
//     if(targetLength <=this.length){
//         return String(this)
//     }
//     if(padString === '') {
//         padString = ' '
//     }
//
//     let result = '';
//     const fillLength = targetLength -this.length
//
//     while(fillLength > result.length) {
//         result += padString
//     }
//     return result.slice(0, fillLength) + String(this)
//
// }