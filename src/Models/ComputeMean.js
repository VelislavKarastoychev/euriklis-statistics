'use strict'
const validator = require('@euriklis/validator')
const errors = require('../View').Errors
function ComputeMean (statistics_instance) {
    let mean = 0.0, i, j, k, n
    // if the data is number array then compute the mean by the formula
    // and if the data is string array then print error message, that the
    // data is string array and finally if the data is array of arrays,then
    // for every array compute the mean by the above procedure.
    new validator(statistics_instance.data).is_number_array()
        .on(true, () => {
            n = statistics_instance.data.length
            for (i = 0; i < n >> 1; i++) {
                mean += statistics_instance.data[2 * i] + statistics_instance.data[2 * i + 1]
            }
            if ((n >> 1 << 1) !== n) {
                mean += statistics_instance.data[n - 1]
            }
            mean /= (n > 2 ? n - 1 : n)
        }).on(false, () => {
            new validator(statistics_instance.data)
                .is_array_with_elements_that_satisfy({ conditions: 'is_number_array()' })
                .on(true, () => {
                    mean = []
                    k = statistics_instance.data.length
                    for (i = 0; i < k; i++) {
                        mean[i] = 0.0
                        n = statistics_instance.data[i].length
                        for (j = 0; j < n >> 1; j++) {
                            mean[i] += statistics_instance[i][2 * j] + statistics_instance[i][2 * j + 1]
                        }
                        mean[i] /= (n > 2 ? n - 1 : n)
                    }
                }).on(false, () => errors.IncorrectDataInComputeMeanInternalMethod())
        })
    return { mean }
}

module.exports = ComputeMean