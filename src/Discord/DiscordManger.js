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
            console.error(error)
            process.exit(1)
        })


        this.checkForBirthday()
        return
        schedule.scheduleJob('0 */12 * * *', () => { this.checkForBirthday() })
    }

    checkForBirthday() {
        console.log('Checking for birthdays...')
        const birthdays = this.app.config.properties.birthday

        const userIDs = Object.keys(birthdays)
        userIDs.forEach(userID => {
            const user = birthdays[userID]
            if (Date.now() > user.timestamp) {
                this.app.config.properties.birthday[userID].timestamp = new Date(new Date().getFullYear() + 1, user.date.month, user.date.day).getTime()
                this.app.config.saveBirthdays()

                console.log(userID)
                return
                this.birthdayGreeting(userID)
            }
        })
    }
    async birthdayGreeting(userID) {
        const user = this.app.config.properties.birthday[userID]
        const channel = await this.client.channels.cache.get(this.app.config.properties.discord.channel)
        channel.send(`<@${userID}> ${user.text}`)
    }
}

module.exports = DiscordManger