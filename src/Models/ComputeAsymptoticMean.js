'use strict'
const validator = require('@euriklis/validator')

function ComputeAsymptoticMean(statistics_instance) {
    let asy_mean, i, j, k, n
    new validator(statistics_instance.data).is_number_array()
        .on(true, () => {
            asy_mean = 0
            n = statistics_instance.data.length
            for (i = 0; i < n >> 1; i++) {
                asy_mean += statistics_instance.data[2 * i] + statistics_instance.data[2 * i + 1]
            }
            if (n !== (n >> 1 << 1)) {
                asy_mean += statistics_instance.data[n - 1]
            }
            asy_mean /= n
        }).on(false, () => {
            new validator(statistics_instance.data)
                .is_array_with_elements_that_satisfy({ conditions: 'is_number_array()' })
                .on(true, () => {
                    asy_mean = []
                    k = statistics_instance.data.length
                    for (i = 0;i < k;i++) {
                        asy_mean[i] = 0.0
                        n = statistics_instance.data[i].length
                        for (j = 0;j < n >> 1;j++) {
                            asy_mean[i] += statistics_instance.data[i][2 * j] + statistics_instance.data[i][2 * j + 1]
                        }
                        if (n !== (n >> 1 << 1)) {
                            asy_mean[i] += statistics_instance.data[i][n - 1]
                        }
                        asy_mean[i] /= n
                    }
                })
        })
    return { 'asymptotic mean': asy_mean }
}
module.exports = ComputeAsymptoticMean
