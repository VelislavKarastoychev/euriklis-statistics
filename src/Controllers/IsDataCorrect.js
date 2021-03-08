'use strict'
const validator = require('@euriklis/validator')
function IsDataCorrect(data) {
    let result = false
    // the data has to be array of numbers,
    // array of strings or array of arrays
    // that have strings or numbers elements.
    new validator(data).is_number_array()
        .or().is_string_array().or()
        .is_array_with_elements_that_satisfy({ conditions: 'is_string_array().or().is_number_array()' })
        .on(true, () => {
            result = true
        })
    return result
}
module.exports = IsDataCorrect