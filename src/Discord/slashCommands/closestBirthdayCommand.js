const { EmbedBuilder } = require('discord.js')
class inactivityCheckCommand {

    constructor(discord) {
        this.discord = discord
        this.name = 'closestbirthday'
    }

    async onCommand(interaction) {
        const person = this.getPersonWithClosestTimestamp()
        const returnEmbed = new EmbedBuilder()
        returnEmbed
            .setTitle('Хоба!')
            .setDescription(`Ближайшая днюха у <@${person.id}>\nДата: <t:${person.timestamp.toString().slice(0, -3)}:R>`)
            .setColor('#ed15ff')
        interaction.editReply({
            embeds: [returnEmbed],
            ephemeral: false
        })
    }

    getPersonWithClosestTimestamp() {
        const birthdays = this.discord.app.config.properties.birthday
        let discordIDs = Object.keys(birthdays);
        let minTimestamp = birthdays[discordIDs[0]].timestamp;
        let person = ''

        for (let i = 1; i < discordIDs.length; i++) {
            let value = birthdays[discordIDs[i]].timestamp;
            if (value < minTimestamp) {
                minTimestamp = value
                person = birthdays[discordIDs[i]]
                person.id = discordIDs[i]
            }
        }
        return person
    }
}


module.exports = inactivityCheckCommand
