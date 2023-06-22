const { SlashCommandBuilder } = require('@discordjs/builders');
class addBirthday {

    data = new SlashCommandBuilder()
        .setName('addbirthday')
        .setDescription('Add new birthday')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Имя именинника')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('omedeto')
                .setDescription('Текст поздравления')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('day')
                .setDescription('День для рождения')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('month')
                .setDescription('Месяц рождения')
                .setRequired(true)
                .addChoices(
                    { name: 'Jan (Январь)', value: '00' },
                    { name: 'Feb (Февраль)', value: '01' },
                    { name: 'Mar (Март)', value: '02' },
                    { name: 'Apr (Апрель)', value: '03' },
                    { name: 'May (Май)', value: '04' },
                    { name: 'Jun (Июнь)', value: '05' },
                    { name: 'Jul (Июль)', value: '06' },
                    { name: 'Aug (Август)', value: '07' },
                    { name: 'Sep (Сентябрь)', value: '08' },
                    { name: 'Oct (Октябрь)', value: '09' },
                    { name: 'Nov (Ноябрь)', value: '10' },
                    { name: 'Dec (Декабрь)', value: '11' },
                ))
        .addStringOption(option =>
            option.setName('year')
                .setDescription('Год рождения')
                .setRequired(true)
        )
}

module.exports = addBirthday
