const Configuration = require('./Config')
const Discord = require('./Discord/DiscordManger')
const keepAlive = require('../server')

class Application {
    async register() {
        this.config = new Configuration()
        this.discord = new Discord(this)
        const server = keepAlive
    }

    async connect() {
        this.discord.connect()
    }
}

module.exports = new Application()