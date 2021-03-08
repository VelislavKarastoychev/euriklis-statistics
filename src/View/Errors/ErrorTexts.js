'use strict'
const ErrorText = 'Euriklis Statistics package error message:\n'
const incorrectDataInStatisticsConstructor = 'Incorrect data in the Statistics constructor. The data has to be number/string array or array of number/string arrays.'
const incorrectDataInDataSetter = 'Incorrect data parameter in the data setter method. Note that the type of the data has to be a number array or a string array or an array of string or number arrays.'
const incorrectTypeArgumentInTypeSetter = 'Incorrect type property in the type setter method. Note that the type property has to be a string with possible values "relevant", "nominal" and "ordinal". The "interval" type data is assumed to be equivalent to the "relevant" data type.'
const incorrectDataInComputeMeanInternalMethod = 'Incorrect data in the internal method compute mean for the Mean method of the library. Note that the data has to be number array or array of number arrays and the type of the statistics instance to be set to "ordinal" or "relevant".'
const impossibleMeanComputationBecauseOfNominalData = 'Impossible mean computation because of nominal data type. Note that the mean method can be used only for ordinal and relevant data types.'
const impossibleDispersionComputationBecauseOfNominalData = 'Impossible dispersion computation because of the nominal data type. Note that the dispersion method can be executed only if the type of the data is "ordered" or "relevant".'
module.exports = {
    ErrorText,
    incorrectDataInStatisticsConstructor,
    incorrectDataInDataSetter,
    incorrectTypeArgumentInTypeSetter,
    incorrectDataInComputeMeanInternalMethod,
    impossibleMeanComputationBecauseOfNominalData,
    impossibleDispersionComputationBecauseOfNominalData,

       
}