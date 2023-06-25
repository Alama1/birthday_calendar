const { EmbedBuilder } = require('discord.js')
const fs = require("fs");
class addBirthdayCommand {

    constructor(discord) {
        this.discord = discord
        this.name = 'addbirthday'
    }

    async onCommand(interaction) {
        const interactionData = interaction.options._hoistedOptions
        const userID = interactionData[0].value
        const wishText = interactionData[1].value
        const day = interactionData[2].value
        const month = interactionData[3].value
        const year = interactionData[4].value
        let timestamp = new Date(new Date().getFullYear(), month, day).getTime()
        if (timestamp < Date.now()) {
            timestamp = new Date(new Date().getFullYear() + 1, month, day).getTime()
        }

        this.discord.app.config.properties.birthday[userID] = { text: wishText, date: { day: day, month: month, year: year }, timestamp: timestamp }

        fs.writeFileSync('./config.json', JSON.stringify(this.discord.app.config.properties), err => {
            console.log(err)
        })
        const returnEmbed = new EmbedBuilder()
        returnEmbed
            .setTitle('Done!')
            .setDescription(`Added new birthday greeting for user <@${userID}>\nWith text <${wishText}>\nFor date <${day}-${parseInt(month) + 1}-${year}>\n
            And will be in <t:${timestamp.toString().slice(0, -3)}:R> days`)
            .setColor('#00c2ff')
        interaction.editReply({
            embeds: [returnEmbed],
            ephemeral: true
        })
    }
}


module.exports = addBirthdayCommand
