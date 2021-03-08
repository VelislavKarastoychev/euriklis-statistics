'use strict'
function CloneStatistics (statistics_instance) {
    const data = statistics_instance.data,
    type = statistics_instance.type
    return {data, type}
}
module.exports = CloneStatistics