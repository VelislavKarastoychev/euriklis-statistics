'use strict'
const validator = require('@euriklis/validator')
function IsParametersCorrect(parameters) {
    let result = false
    new validator(parameters).is_object()
        .on(true, () => {
            new validator(parameters.data).is_undefined()
                .or().is_same(null).or().is_number_array()
                .or().is_string_array().or()
                .is_array_with_elements_that_satisfy({ conditions: 'is_array_number_array().or().is_string_array()' })
                .and().bind(
                    new validator(parameters.type).is_undefined().or().is_same(null)
                        .or().is_same('ordinal')
                        .or().is_same('relevant')
                        .or().is_same('nominal')
                )
                .and().bind(
                    new validator(parameters.metadata).is_undefined()
                        .or().is_same(null)
                        .or().is_object()
                )
                .on(true, () => result = true)
        })
    return result
}
module.exports = IsParametersCorrect