'use strict'
const controllers = require('./Controllers')
const models = require('./Models')
const errors = require('./View/Error')
const infos = require('./View/Info')
const warnings = require('./View/Warnings')

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
            warnings.IncompleteParametersInStatisticsConstructor()
            parameters = models.TryToSetByDefault(parameters)
            return new Statistics(parameters)
        }
    }
    clone() {
        // TODO:cloneStatistics
        return models.CloneStatistics(this)
    }
    /**
     * @method data
     * @param {Array.<string | number | Array>} data_array
     * @description this method sets the data property and
     * changes the previous value of the data property.
     */
    set data(data_array) {
        // TODO IsDataCorrect and the corresponded error.
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
        // TODO IsTypeCorrect and the corresponded error
        if (controllers.IsTypeCorrect(type)) this.__type__ = type
        else errors.IncorrectTypeArgumentInTypeSetter()
    }
    get type() {
        return this.__type__ || null
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
     * @method mean
     * @description this method computes the average of
     * the data property of the current statistics instance.
     * The result is stored into the metadata property of the
     * instance and can be accessible with the getter method
     * metadata().mean
     */
    mean() {
        // TODO the models.ComputeMean() and the corresponded error.
        if (this.type() === 'ordinal' || this.type() === 'relevant') {
            this.metadata = models.ComputeMean(this)
        } else errors.ImpossibleMeanComputationBecauseOfNominalData()
        return this
    }
    computeMean() {
        if (this.type() === 'ordinal' || this.type() === 'relevant') {
            return models.ComputeMean(this).mean
        } else errors.ImpossibleMeanComputationBecauseOfNominalData()
    }
    compute_mean() {
        return this.computeMean()
    }
    dispersion() {
        // TODO the models.ComputeDispersion method and the corresponding error.
        if (this.type() === 'ordinal' || this.type() === 'relevant') {
            this.metadata = models.ComputeDispersion(this)
        } else errors.ImpossibleDispersionComputationBecauseOfNominalData()
        return this
    }
    computeDispersion() {
        if (this.type() === 'ordinal' || this.type() === 'relevant') {
            return models.ComputeDispersion(this).dispersion
        } else errors.ImpossibleDispersionComputationBecauseOfNominalData()
    }
    compute_dispersion () {
        return this.computeDispersion()
    }
    deviation() {
        const deviation = Math.sqrt(this.computeDispersion())
        this.metadata = { deviation }
        return this
    }
    computeDeviation () {
        return Math.sqrt(this.computeDispersion())
    }
    normalize_data() {
        if (this.type() === 'ordinal') {
            this.data = models.Normalize(this)
            // update the mean to 0 and the deviation to 1.
            this.metadata = { mean: 0, 'standard deviation': 1, dispersion: 1 }
        } else warnings.NotPossibleNormalizationBecauseOfType()
        return this
    }
    normalizeData() {
        return this.normalize_data()
    }

    median() {
        if (this.type() === 'ordinal' || this.type() === 'relevant') {
            this.metadata = models.ComputeMedian(this)
        } else warnings.NotPossibleMedianComputationBecauseOfType()
        return this
    }
    computeMedian() {
        if (this.type() === 'ordinal' || this.type() === 'relevant') {
            return models.ComputeMedian(this).median
        } else warnings.NotPossibleMedianComputationBecauseOfType()
    }
    compute_median() {
        return this.computeMedian()
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