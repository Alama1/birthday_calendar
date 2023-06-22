const {IntentsBitField, Client} = require("discord.js");
const InteractionHandler = require("./handlers/InteractionHandler");
const schedule = require('node-schedule');
const fs = require("fs");

class DiscordManger {
    constructor(app) {
        this.app = app
    }

    connect() {
        const allIntends = new IntentsBitField(9763)
        this.client = new Client({
            cacheGuilds: true,
            cacheChannels: true,
            cacheOverwrites: false,
            cacheRoles: true,
            cacheEmojis: false,
            cachePresences: false,
            intents: allIntends
        })

        this.client.on('ready', () => {
            this.interactionHandler = new InteractionHandler(this)
            console.log('Discord is ready')
        })

        this.client.on('interactionCreate', interaction => {
            this.interactionHandler.onInteraction(interaction)
        })

        this.client.login(this.app.config.properties.discord.token).catch(error => {
            this.app.log.error(error)
            process.exit(1)
        })

        schedule.scheduleJob('0 */12 * * *', () => { this.checkForBirthday() })
    }

    checkForBirthday() {
        console.log('Checking for birthdays...')
        const birthdays = this.app.config.properties.birthday

        const userIDs = Object.keys(birthdays)
        userIDs.forEach(userID => {
            if (Date.now() + 3600 > birthdays[userID].timestamp) {
                this.birthdayGreeting(userID)
            }
        })
    }
    async birthdayGreeting(userID) {
        const user = this.app.config.properties.birthday[userID]
        const channel = await this.client.channels.cache.get(this.app.config.properties.discord.channel)
        channel.send(`<@${userID}> ${user.text}`)
        this.app.config.properties.birthday[userID].timestamp = new Date(new Date().getFullYear() + 1, user.date.month, user.date.day).getTime()
        fs.writeFileSync('./config.json', JSON.stringify(this.app.config.properties), err => {
            console.log(err)
        })
    }
}

module.exports = DiscordManger