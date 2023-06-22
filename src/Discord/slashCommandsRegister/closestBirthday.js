const {SlashCommandBuilder} = require("discord.js");

class closestBirthday {
    constructor() {
    }

    data = new SlashCommandBuilder()
        .setName('closestbirthday')
        .setDescription('Показать ближайший день рождения')
}

module.exports = closestBirthday
