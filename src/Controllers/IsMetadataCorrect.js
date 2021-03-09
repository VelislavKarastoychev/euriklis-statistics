'use strict'
const validator = require('@euriklis/validator')
function IsMetadataCorrect (data) {
    return new validator(data).is_object().answer
}
module.exports = IsMetadataCorrect
