function mySetTimeout(callback, delay,...args){
    const start = Date.now()
    while(true){
        if(Date.now()-start >= delay) {
            callback(...args)
            break;
        }
    }
}
 module.exports = mySetTimeout;