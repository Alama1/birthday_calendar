const Configuration = require('./Config')
const Discord = require('./Discord/DiscordManger')

class Application {
    async register() {
        this.config = new Configuration()
        this.discord = new Discord(this)
    }

    async connect() {
        this.discord.connect()
    }
}

module.exports = new Application()