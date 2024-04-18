const fs = require('fs')
const path = require('path')

require('dotenv').config()
class Config {
    properties = {
        "discord": {
            "token": process.env.TOKEN,
            "channel": "",
            "guildID": ""
        },
        "birthday": {

        }
    }
    constructor() {
        this.properties = require('../config.json')
        this.properties.birthday = require('./birthdays.json')
        this.properties.discord.token = process.env.TOKEN
    }

    saveBirthdays() {
        fs.writeFileSync(path.resolve(__dirname + '/birthdays.json'), JSON.stringify(this.properties.birthday), {encoding: "utf-8"})
    }
}

module.exports = Config