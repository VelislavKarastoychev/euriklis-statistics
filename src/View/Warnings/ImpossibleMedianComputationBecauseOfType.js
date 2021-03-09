'use strict'
const message = require('@euriklis/message')
const texts = require('./WarningTexts')
module.exports = () => {
    return new message().bold().italic().underline()
        .set_color_yellow().append(texts.warningText).reset()
        .set_color_cyan().append(texts.impossibleMedianComputationBecauseOfType)
        .reset().log()
}