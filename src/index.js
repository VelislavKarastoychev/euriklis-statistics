'use strict'
const controllers = require('./Controllers')
const models = require('./Models')
const errors = require('./View').Errors
const infos = require('./View').Infos
const warnings = require('./View').Warnings

class Statistics {
    /**
     * 
     * @param {{data : Array.<string | number | Array>, type : 'ordered' | 'nominal' | 'relevant', metadata : {}}} parameters
     * @description Creates an Statistics instance. Every
     * Statistics instance has to has data, type and metadata
     * properties. The data property (key) has to be an array
     * of strings, numbers and arrays. Data that has items of
     * objects is not accepted. If you want to insert data that
     * is not supported by the Statistics constructor, please
     * use the array type of strings or array of array of strings.
     *  
     */
    constructor(parameters) {
        if (controllers.IsParametersCorrect(parameters)) {
            models.CreateStatisticsInstance(this, parameters)
        } else {
            this.__data__ = []
            this.__type__ = 'relevant'
            this.__metadata__ = {}
        }
    }

    clone() {
        return new Statistics(models.CloneStatistics(this))
    }
    /**
     * @method data
     * @param {Array.<string | number | Array>} data_array
     * @description this method sets the data property and
     * changes the previous value of the data property.
     */
    set data(data_array) {
        if (controllers.IsDataCorrect(data_array)) this.__data__ = data_array
        else errors.IncorrectDataInDataSetter()
    }
    get data() {
        return this.__data__ || null
    }
    /**
     * 
     * @param {Array.<string | number | Array>} data_array
     * @description similar to the setter method data. 
     */
    set_data(data_array) {
        this.data = data_array
        return this
    }
    /**
     * @method type
     * @param {'ordered' | 'nominal' | 'relevant'} type
     * @description this method sets the type property of the
     * current Statistics instance.
     */
    set type(type) {
        if (controllers.IsTypeCorrect(type)) this.__type__ = type
        else errors.IncorrectTypeArgumentInTypeSetter()
    }
    get type() {
        return this.__type__ || null
    }
    set metadata (data) {
        if (controllers.IsMetadataCorrect(data)) models.AddMetadata(this, data)
        else errors.IncorrectMetadata()
    }
    get metadata () {
        return this.__metadata__
    }
    /**
     * 
     * @param {'ordered' | 'nominal' | 'relevant'} type
     * @description similar to the setter type method. 
     */
    set_type(type) {
        this.type = type
        return this
    }
    /**
     * @method compute_mean
     * @description this method computes the average of
     * the data property of the current statistics instance.
     * The result is stored into the metadata property of the
     * instance and can be accessible with the getter method
     * metadata().mean
     */
    compute_mean() {
        if (this.type === 'ordinal' || this.type === 'relevant') {
            this.metadata = models.ComputeMean(this)
        } else errors.ImpossibleMeanComputationBecauseOfNominalData()
        return this
    }
    /**
     * @method computeMean
     * @description This is the same method like the
     * compute_mean method. So for more information see the
     * documentation of this method.
     */
    computeMean() {
        return this.compute_mean()
    }
    get Mean() {
        if (this.type === 'ordinal' || this.type === 'relevant') {
            return models.ComputeMean(this).mean
        } else errors.ImpossibleMeanComputationBecauseOfNominalData()
    }
    get mean() {
        return this.Mean
    }
    get asymptotic_mean () {
        if (this.type === 'ordinal' || this.type === 'relevant') {
            return models.ComputeAsymptoticMean(this)['asymptotic mean']
        } else errors.ImpossibleMeanComputationBecauseOfNominalData()
    }
    get asymptoticMean () {
        return this.asymptotic_mean
    }
    get ['asymptotic mean'] () {
        return this.asymptotic_mean
    }
    compute_asymptotic_mean() {
        if (this.type === 'ordinal' || this.type === 'relevant') {
            this.metadata = models.ComputeAsymptoticMean(this)
        } else errors.ImpossibleMeanComputationBecauseOfNominalData()
        return this
    }
    computeAsymptoticMean () {
        return this.compute_asymptotic_mean()
    }
    compute_dispersion() {
        if (this.type === 'ordinal' || this.type === 'relevant') {
            this.metadata = models.ComputeDispersion(this)
        } else errors.ImpossibleDispersionComputationBecauseOfNominalData()
        return this
    }
    computeDispersion () {
        return this.compute_dispersion()
    }
    get Dispersion() {
        if (this.type === 'ordinal' || this.type === 'relevant') {
            return models.ComputeDispersion(this).dispersion
        } else errors.ImpossibleDispersionComputationBecauseOfNominalData()
    }
    get dispersion() {
        return this.Dispersion
    }
    get ["asymptotic dispersion"] () {
        if (this.type === 'ordinal' || this.type === 'relevant') {
            return models.ComputeAsymptoticDispersion(this)["asymptotic dispersion"]
        } else errors.ImpossibleDispersionComputationBecauseOfNominalData()
    }
    get asymptotic_dispersion () {
        return this["asymptotic dispersion"]
    }
    get asymptoticDispersion () {
        return this["asymptotic dispersion"]
    }
    compute_asymptotic_dispersion () {
        if (this.type === 'ordinal' || this.type === 'relevant') {
            this.metadata = models.ComputeAsymptoticDispersion(this)
        } else errors.ImpossibleDispersionComputationBecauseOfNominalData()
        return this
    }
    computeAsymptoticDispersion () {
        return this.compute_asymptotic_dispersion()
    }
    get deviation () {
        let deviation = Math.sqrt(this.dispersion)
        return deviation
    }
    get Deviation () {
        let deviation = Math.sqrt(this.dispersion)
        return deviation
    }
    compute_deviation() {
        const deviation = Math.sqrt(this.dispersion)
        this.metadata = { deviation }
        return this
    }
    computeDeviation() {
        return this.compute_deviation()
    }
    get asymptotic_deviation () {
        return Math.sqrt(this.asymptotic_dispersion)
    }
    get asymptoticDeviation () {
        return Math.sqrt(this.asymptotic_dispersion)
    }
    get ["asymptotic deviation"] () {
        return this.asymptotic_deviation
    }
    compute_asymptotic_deviation () {
        this.metadata = {"asymptotic deviation" : this.asymptotic_deviation}
        return this
    }
    computeAsymptoticDeviation () {
        this.metadata = {"asymptotic deviation" : this.asymptotic_deviation}
        return this
    }
    normalize_data() {
        if (this.type === 'ordinal') {
            this.data = models.Normalize(this)
            // update the mean to 0 and the deviation to 1.
            // this.metadata = { mean: 0, 'standard deviation': 1, dispersion: 1 }
        } else warnings.ImpossibleNormalizationBecauseOfType()
        return this
    }
    normalizeData() {
        return this.normalize_data()
    }
    get normalized_data () {
        return models.Normalize(this)
    }
    compute_median() {
        if (this.type === 'ordinal' || this.type === 'relevant') {
            this.metadata = models.ComputeMedian(this)
        } else warnings.NotPossibleMedianComputationBecauseOfType()
        return this
    }
    computeMedian () {
        return this.compute_median()
    }
    get Median() {
        if (this.type === 'ordinal' || this.type === 'relevant') {
            return models.ComputeMedian(this).median
        } else warnings.NotPossibleMedianComputationBecauseOfType()
    }
    median() {
        return this.Median
    }
    mode() {
        this.metadata = models.ComputeMode(this)
        return this
    }

    computeMode() {
        return models.ComputeMode(this)
    }
    compute_mode() {
        return this.computeMode()
    }

    kurtosis() {
        //
    }

    computeKurtosis() {
        return models.ComputeKurtosis(this)
    }
    compute_kurtosis() {
        return this.computeKurtosis()
    }

}
module.exports = Statistics