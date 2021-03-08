'use strict'
const informationText = 'Euriklis statistics package information message:\n'
const automaticallyDeclared = function automaticallyDeclared (property, value, location) {
    return `The property ${property} was automatically set to the default value for number array data to ${value} in the method/module ${location}`
}
module.exports = {
    informationText,
    automaticallyDeclared,
    
}