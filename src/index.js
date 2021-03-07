'use strict'

class Statistics {
    constructor (parameters) {
        if (controllers.IsParametersCorrect(parameters)) {
            models.CreateStatisticsInstance(this, parameters) 
        } else {
            warnings.IncompleteParametersInStatisticsConstructor()
            parameters = models.TryToSetByDefault(parameters)
            return new Statistics(parameters)
        }
    }
    set data (data_array) {
        if (controllers.IsDataCorrect(data_array)) this.__data__ = data_array
        else errors.IncorrectDataInDataSetter()
    }
    set_data (data_array) {
        this.data = data_array
        return this
    }
    set type (type) {
        //
    }
}