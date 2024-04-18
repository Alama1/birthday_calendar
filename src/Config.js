const fs = require('fs')

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
        this.properties.birthday = require('../birthdays.json')
        this.properties.discord.token = process.env.TOKEN
    }

    saveBirthdays() {
        fs.writeFileSync('../birthdays.json', JSON.stringify(this.properties.birthday), err => {
                    console.log(err)
                })
    }
}

module.exports = Config