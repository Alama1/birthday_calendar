const { EmbedBuilder } = require('discord.js')
class inactivityCheckCommand {

    constructor(discord) {
        this.discord = discord
        this.name = 'closestbirthday'
    }

    async onCommand(interaction) {
        const birthdays = this.discord.app.config.properties.birthday
        let keys = Object.keys(birthdays);
        let min = birthdays[keys[0]].timestamp;
        let human = ''

        for (let i = 1; i < keys.length; i++) {
            let value = birthdays[keys[i]].timestamp;
            if (value < min) {
                min = value
                human = birthdays[keys[i]]
                human.id = keys[i]
            }
        }
        const returnEmbed = new EmbedBuilder()
        returnEmbed
            .setTitle('Хоба!')
            .setDescription(`Ближайшая днюха у <@${human.id}>\nЧерез <t:${human.timestamp.toString().slice(0, -3)}:R>`)
            .setColor('#ed15ff')
        interaction.reply({
            embeds: [returnEmbed]
        })
    }
}


module.exports = inactivityCheckCommand
