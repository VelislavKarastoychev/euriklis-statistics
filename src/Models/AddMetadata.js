'use strict'

function AddMetadata (statistics_instance, metadata) {
    Object.assign(statistics_instance.__metadata__, metadata)
} 
module.exports = AddMetadata