'use strict'
const validator = require('@euriklis/validator')
function IsTypeCorrect(type) {
    return new validator(type).is_string().and().is_same('relevant')
        .or().is_same('nominal').or().is_same('ordinal').answer
}
module.exports = IsTypeCorrect