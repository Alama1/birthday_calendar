const {SlashCommandBuilder} = require("discord.js");

class allbirthdays {
    constructor() {
    }

    data = new SlashCommandBuilder()
        .setName('allbirthdays')
        .setDescription('Показать всех именинников')
}

module.exports = allbirthdays
