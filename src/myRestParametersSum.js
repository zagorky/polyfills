function myRestParametersSum(...args){
    return args.reduce((acc, elem) => acc += elem, 0)

}

module.exports = myRestParametersSum