'use strict'
const message = require('@euriklis/message')
const texts = require('./ErrorTexts')
module.exports = () => {
    const error_message = new message().bold().italic().underline()
        .set_color_yellow().append(texts.ErrorText).reset()
        .set_color_cyan().append(texts.incorrectDataInStatisticsConstructor)
        .reset().text
    throw new Error(error_message)
}
