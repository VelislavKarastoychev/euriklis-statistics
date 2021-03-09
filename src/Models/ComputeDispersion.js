'use strict'
const validator = require('@euriklis/validator')
function ComputeDispersion(statistics_instance) {
    let dispersion, i, j, k, n, ximmju, xip1mmju
    new validator(statistics_instance.data).is_number_array()
        .on(true, () => {
            // compute the dispersion trivially...
            dispersion = 0.0
            n = statistics_instance.data.length
            for (i = 0; i < n >> 1; i++) {
                ximmju = statistics_instance.data[2 * i] - (((n > 2 ? n - 1 : n) / n) * statistics_instance.mean)
                xip1mmju = statistics_instance.data[2 * i + 1] - (((n > 2 ? n - 1 : n) / n) * statistics_instance.mean)
                dispersion += (ximmju * ximmju) + (xip1mmju * xip1mmju)
            }
            if (n !== (n >> 1 << 1)) {
                ximmju = statistics_instance.data[n - 1] - statistics_instance.mean
                dispersion += ximmju * ximmju
            }
            dispersion /= (n > 2 ? n - 1 : n)
        }).on(false, () => {
            new validator(statistics_instance.data)
                .is_array_with_elements_that_satisfy({ conditions: 'is_number_array()' })
                .on(true, () => {
                    dispersion = []
                    k = statistics_instance.data.length
                    for (i = 0; i < k; i++) {
                        dispersion[i] = 0.0
                        n = statistics_instance.data[i].length
                        for (j = 0; j < n >> 1; j++) {
                            ximmju = statistics_instance.data[i][2 * j] - (((n > 2 ? n - 1 : n) / n) * statistics_instance.mean[i])
                            xip1mmju = statistics_instance.data[i][2 * j + 1] - (((n > 2 ? n - 1 : n) / n) * statistics_instance.mean[i])
                            dispersion[i] += ximmju * ximmju + xip1mmju * xip1mmju
                        }
                        if (n !== (n >> 1 << 1)) {
                            ximmju = statistics_instance.data[i][n - 1] - statistics_instance.mean[n - 1]
                            dispersion[i] += ximmju * ximmju
                        }
                        dispersion[i] /= (n > 2 ? n - 1 : n)
                    }
                })
        })
    return { dispersion }
}
module.exports = ComputeDispersion