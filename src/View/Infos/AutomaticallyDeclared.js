const message = require('@euriklis/message')
const texts = require('./infoTexts')
module.exports = (property, value, location) => {
    return new message().bold().italic().underline()
        .set_color_yellow().append(texts.informationText)
        .reset().set_color_cyan()
        .append(texts.automaticallyDeclared(property, value, location))
        .reset().log()
} 