'use strict'
const CreateStatisticsInstance = require('./CreateStatisticsInstance')
const CloneStatistics = require('./CloneStatistics')
const ComputeMean = require('./ComputeMean')
const AddMetadata = require('./AddMetadata')
const ComputeDispersion = require('./ComputeDispersion')
const ComputeAsymptoticMean = require('./ComputeAsymptoticMean')
const ComputeAsymptoticDispersion = require('./ComputeAsymptoticDispersion')
const Normalize = require('./Normalize')
module.exports = {
    CreateStatisticsInstance,
    CloneStatistics,
    ComputeMean,
    AddMetadata,
    ComputeDispersion,
    ComputeAsymptoticMean,
    ComputeAsymptoticDispersion,
    Normalize,
}