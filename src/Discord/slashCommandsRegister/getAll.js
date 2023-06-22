const {SlashCommandBuilder} = require("discord.js");

class getAll {
    constructor() {
    }

    data = new SlashCommandBuilder()
        .setName('getall')
        .setDescription('Показать всех именинников')
}

module.exports = getAll
