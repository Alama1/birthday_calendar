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
        this.properties.discord.token = process.env.TOKEN
    }
}

module.exports = Config