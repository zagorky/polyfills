//
// String.prototype.myRepeater = function (count) {
//     let newStr = ''
//     if(count === 0) {
//         return newStr
//     }
//
//     if(!count || count < 0 || !Number.isInteger(count)) {
//         throw RangeError('invalid')
//     }
//
//     for(let i=0; i<count; i+=1) {
//         newStr += this
//     }
//     return newStr
// }

String.prototype.myRepeater = function(count) {
    let newStr = ''

    if(count === 0){
        return newStr
    }
    
    if(count < 0 || !Number.isInteger(count) || !count ) {
        throw RangeError()
    }

   for(let i =0; i< count; i+=1) {
        newStr += this
    }
    return newStr
}