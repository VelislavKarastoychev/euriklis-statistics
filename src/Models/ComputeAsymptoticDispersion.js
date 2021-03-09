'use strict'
const validator = require('@euriklis/validator')

function ComputeAsymptoticDispersion(statistics_instance) {
    let asy_dispersion, i, j, k, n, xi, xij, xip1, xijp1
    new validator(statistics_instance.data).is_number_array()
        .on(true, () => {
            asy_dispersion = 0
            n = statistics_instance.data.length
            for (i = 0; i < n >> 1; i++) {
                xi = statistics_instance.data[2 * i] - statistics_instance.asymptotic_mean
                xip1 = statistics_instance.data[2 * i + 1] - statistics_instance.asymptotic_mean
                asy_dispersion += xi * xi + xip1 * xip1
            }
            if (n !== (n >> 1 << 1)) {
                xi = statistics_instance.data[n - 1] - statistics_instance.asymptotic_mean
                asy_dispersion += xi * xi
            }
            asy_dispersion /= n
        }).on(false, () => {
            new validator(statistics_instance.data)
                .is_array_with_elements_that_satisfy({ conditions: 'is_number_array()' })
                .on(true, () => {
                    asy_dispersion = []
                    k = statistics_instance.data.length
                    for (i = 0; i < k; i++) {
                        asy_dispersion[i] = 0
                        n = statistics_instance.data[i].length
                        for (j = 0; j < n >> 1; j++) {
                            xij = statistics_instance.data[i][2 * j] - statistics_instance.asymptotic_mean[i]
                            xijp1 = statistics_instance.data[i][2 * j + 1] - statistics_instance.asymptotic_mean[i]
                            asy_dispersion[i] += xij * xij + xijp1 * xijp1
                        }
                        if (n !== (n >> 1 << 1)) {
                            xij = statistics_instance.data[i][n - 1] - statistics_instance.asymptotic_mean[i]
                            asy_dispersion[i] += xij * xij
                        }
                        asy_dispersion[i] /= n
                    }
                })
        })
    return { "asymptotic dispersion": asy_dispersion }
}
module.exports = ComputeAsymptoticDispersion