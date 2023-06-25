const { EmbedBuilder } = require('discord.js')
const fs = require("fs");
class addBirthdayCommand {

    constructor(discord) {
        this.discord = discord
        this.name = 'addbirthday'
    }

    async onCommand(interaction) {
        const [userID, wishText, day, month, year] = this.getDataFromInteraction(interaction)
        let nextBirthdayTimestamp = this.getTimestampOfNextBirthday(day, month)
        this.updateUserData(userID, wishText, day, month, year)

        const returnEmbed = new EmbedBuilder()
        returnEmbed
            .setTitle('Done!')
            .setDescription(`Added new birthday greeting for user <@${userID}>\nWith text <${wishText}>\nFor date <${day}-${parseInt(month) + 1}-${year}>\n
            And will be in <t:${nextBirthdayTimestamp.toString().slice(0, -3)}:R> days`)
            .setColor('#00c2ff')
        interaction.editReply({
            embeds: [returnEmbed],
            ephemeral: true
        })
    }

    getDataFromInteraction(interaction) {
        const interactionData = interaction.options._hoistedOptions
        const userID = interactionData[0].value
        const wishText = interactionData[1].value
        const day = interactionData[2].value
        const month = interactionData[3].value
        const year = interactionData[4].value

        return [userID, wishText, day, month, year]
    }

    getTimestampOfNextBirthday(day, month) {
        let timestamp = new Date(new Date().getFullYear(), month, day).getTime()
        if (timestamp < Date.now()) {
            timestamp = new Date(new Date().getFullYear() + 1, month, day).getTime()
        }
        return timestamp
    }

    updateUserData(userID, wishText, day, month, year, nextBirthdayTimestamp) {
        this.discord.app.config.properties.birthday[userID] = { text: wishText, date: { day: day, month: month, year: year }, timestamp: nextBirthdayTimestamp }

        fs.writeFileSync('./config.json', JSON.stringify(this.discord.app.config.properties), err => {
            console.log(err)
        })
    }
}


module.exports = addBirthdayCommand
