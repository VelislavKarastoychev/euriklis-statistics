'use strict'
const validator = require('@euriklis/validator')
const infos = require('../View').Infos
const errors = require('../View').Errors
function CreateStatisticsInstance(statistics_instance, statistics_options) {
    new validator(statistics_options.data).is_number_array()
        .on(true, () => {
            new validator(statistics_options.type).is_undefined()
                .on(true, () => {
                    statistics_options.type = 'relevant'
                    infos.AutomaticallyDeclared('type', 'relevant', 'Statistics constructor')
                })
            statistics_instance.__data__ = statistics_options.data
            statistics_instance.__type__ = statistics_options.type
        }).on(false, () => {
            new validator(statistics_options.data).is_string_array()
                .on(true, () => {
                    new validator(statistics_options.type).is_undefined()
                        .or().is_same(null).on(true, () => {
                            statistics_options.type = 'nominal'
                            infos.AutomaticallyDeclared('type', 'nominal', 'Statistics constructor')
                        })
                    statistics_instance.__type__ = statistics_options.type
                    statistics_instance.__data__ = statistics_options.data
                })
                .on(false, () => {
                    new validator(statistics_options.data).is_array().and()
                        .for_all(items => {
                            return items.is_number_array()
                        }).on(true, () => {
                            new validator(statistics_options.type).is_undefined()
                                .or().is_same(null).on(true, () => {
                                    infos.AutomaticallyDeclared('type', 'relevant', 'Statistics constructor')
                                    statistics_options.type = 'relevant'
                                    statistics_instance.__type__ = statistics_options.type
                                    statistics_instance.__data__ = statistics_options.data
                                })
                        }).copy()
                        .for_all(items => {
                            return items.is_string_array()
                        })
                        .on(true, () => {
                            new validator(statistics_options.type).is_undefined()
                                .or().is_same(null).on(true, () => {
                                    infos.AutomaticallyDeclared('type', 'nominal', 'Statistics constructor')
                                    statistics_options.type = 'nominal'
                                    statistics_instance.__type__ = statistics_options.type
                                    statistics_instance.__data__ = statistics_options.data
                                })
                        })
                    new validator(statistics_options.type).is_undefined()
                        .or().is_same(null)
                        .on(true, () => errors.IncorrectDataInStatisticsConstructor())
                })
        })
    statistics_instance.__metadata__ = statistics_options.metadata || {}
    return statistics_instance
}
module.exports = CreateStatisticsInstance