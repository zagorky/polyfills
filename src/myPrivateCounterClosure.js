function myPrivateCounterClosure(){
let counter = 0;

    return {
    increment() {
        counter += 1
    },
    decrement(){
        counter -= 1
    },
    getValue(){
        return counter
    },
    reset(){
        counter = 0
    }
    }
}

module.exports = myPrivateCounterClosure;