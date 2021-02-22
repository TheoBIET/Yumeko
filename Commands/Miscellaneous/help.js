const {
    MessageEmbed
} = require('discord.js');
const {
    PREFIX
} = require('../../config');
const {
    readdirSync
} = require('fs');
const categoryList = readdirSync('./Commands');
console.log('%chelp.js line:5 categoryList', 'color: #007acc;', categoryList);

module.exports.run = (client, message, args) => {
    console.log('%chelp.js line:14 client.commands.', 'color: #007acc;', client.commands.filter(cat => cat.help.category));


    if (!args) {
        const embed = new MessageEmbed()
            .setColor('#36393F')
            .addField('Liste des commandes,', `Vous trouverez ci-dessous une liste de toutes les commandes disponibles classées en sous-catégories.\nPour plus d'informations sur une commande, tapez \`${PREFIX}help <command_name>\``)
            .setFooter('蛇喰 夢子 v0.7 by ƊɑѵƊɑѵ')
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()

        for (category of categoryList) {
            embed.addField(
                `__${category}__`,
                `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(', ')}`
            )
        }

        return message.channel.send(embed)
    } else {
        if(!command) return message.reply('Cette commande n\'existe probablement pas')

        const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

        const embed = new MessageEmbed()
            .setTitle(`\`${command.help.name}\``)
            .addField('**Description de la commande**', `${command.help.description} \n(**Cooldown:** ${command.help.cooldown} secondes)`)
            .addField('**Utilisation**', command.help.usage ? `${PREFIX}${command.help.name} | ${command.help.usage}` : `${PREFIX}${command.help.name}`, true)
            .setThumbnail(client.user.displayAvatarURL())

            if (command.help.aliases.length > 1) embed.addField('**Alias**', `${command.help.aliases.join(', ')}`, true)
            return message.channel.send(embed);
    }
}

module.exports.help = {
    name: 'help',
    aliases: ['help'],
    category: 'miscellaneous',
    description: 'Vous envoie toute l\'aide nécessaire de toutes les commandes disponibles avec le bot 蛇喰 夢子, mais ça tu le sais déjà ^^',
    cooldown: 10,
    usage: 'exemple: **?say Hello World**',
    isUserAdmin: false,
    permissions: true,
    args: false,
}