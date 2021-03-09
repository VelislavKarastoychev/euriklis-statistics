'use strict'
const validator = require('@euriklis/validator')

function Normalize(sti) {
    let normalized_data = [], i, j, k, n
    new validator(sti.data).is_number_array()
        .on(true, () => {
            n = sti.data.length
            for (i = 0; i < n >> 1; i++) {
                sti.__data__[2 * i] = (sti.data[2 * i] - sti.mean) / sti.deviation
                sti.__data[2 * i + 1] = (sti.data[2 * i + 1] - sti.mean) / sti.deviation
            }
            if (n !== (n >> 1 << 1)) sti.__data__[n - 1] = (sti.data[n - 1] - sti.mean) / sti.deviation
        }).on(false, () => {
            new validator(sti.data)
                .is_array_with_elements_that_satisfy({ conditions: 'is_number_array()' })
                .on(true, () => {
                    k = sti.data.length
                    for (i = 0; i < k; i++) {
                        n = sti.data[i].length
                        for (j = 0; j < n >> 1; j++) {
                            sti.__data__[i][2 * j] = (sti.data[i][2 * j] - sti.mean[i]) / sti.deviation[i]
                            sti.__data__[i][2 * j + 1] = (sti.data[i][2 * j + 1] - sti.mean[i]) / sti.deviation[i]
                        }
                        if (n !== (n >> 1 << 1)) {
                            sti.__data__[i][n - 1] = (sti.data[n - 1] - sti.mean[i]) / sti.deviation[i]
                        }
                    }
                })
        })
    return normalized_data
}
module.exports = Normalize