const { EmbedBuilder } = require('discord.js')
class getAllCommand {

    constructor(discord) {
        this.discord = discord
        this.name = 'getall'
    }

    async onCommand(interaction) {
        const birthdayUsers = this.discord.app.config.properties.birthday
        const userArray = []
        const userIDs = Object.keys(birthdayUsers)
        for (const userID of userIDs) {
            const username = await interaction.guild.members.fetch(userID)
            if (!username) return
            userArray.push(
                {name: `${username.user.username}`, value: `Текст поздравления: **${birthdayUsers[userID].text}** \n 
                Дата: **${birthdayUsers[userID].date.day}-${parseInt(birthdayUsers[userID].date.month) + 1}-${birthdayUsers[userID].date.year}**\n
                Будет через: <t:${birthdayUsers[userID].timestamp.toString().slice(0, -3)}:R>\n<--------------------->`}
            )
        }
        const returnEmbed = new EmbedBuilder()
        returnEmbed
            .setTitle('Все дни рождения:')
            .setColor('#00c2ff')
            .addFields(userArray)
        interaction.editReply({
            embeds: [returnEmbed],
            ephemeral: false
        })
    }
}


module.exports = getAllCommand
