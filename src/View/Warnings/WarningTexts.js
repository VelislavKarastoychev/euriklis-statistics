'use strict'
const warningText = 'Euriklis Statistics package warning message:\n'
const impossibleNormalizationBecauseOfType = 'The normalization procedure is not possible because of the type of the data. Note that only relative data type is recommended for normalization of the author of the package. The ordinal data type can be normalized but in not effective way to transforming data types.'
const impossibleMedianComputationBecauseOfType = 'The median of the data can not be obtained because the type of the data is probably nominal. Note that the median metrics require the data to be of ordinal or relevant type.'
module.exports = {
    warningText,
    impossibleNormalizationBecauseOfType,
    impossibleMedianComputationBecauseOfType,
    
    
}