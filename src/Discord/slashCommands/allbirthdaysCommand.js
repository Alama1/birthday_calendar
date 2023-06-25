const { EmbedBuilder } = require('discord.js')
class allbirthdaysCommand {

    constructor(discord) {
        this.discord = discord
        this.name = 'allbirthdays'
    }

    async onCommand(interaction) {
        const userArray = await this.getArrayOfUserFields(interaction)
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

    async getArrayOfUserFields(interaction) {
        const birthdayUsers = this.discord.app.config.properties.birthday
        const userIDs = Object.keys(birthdayUsers)
        const userArray = []
        for (const userID of userIDs) {
            const username = await interaction.guild.members.fetch(userID)
            if (!username) return
            userArray.push(
                {name: `${username.user.username}`,
                 value: `Текст поздравления: **${birthdayUsers[userID].text}** \n 
                Дата: **${birthdayUsers[userID].date.day}-${parseInt(birthdayUsers[userID].date.month) + 1}-${birthdayUsers[userID].date.year}**\n
                Дата: <t:${birthdayUsers[userID].timestamp.toString().slice(0, -3)}:R>\n<--------------------->`,
                time: birthdayUsers[userID].timestamp}
            )
        }
        userArray.sort((a, b) => a.time - b.time)
        return userArray
    }
}


module.exports = allbirthdaysCommand
