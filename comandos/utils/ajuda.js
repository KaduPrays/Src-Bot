const Discord = require("discord.js");
const colors = require("../../colors.json");
const config = require("../../config.json");

module.exports = {
    name: "ajuda",
    description: "Mostra os comandos do bot.",
    aliases: ["help", "commands", "comandos"],
    category: "utils",
    ClientPerm: ["EMBED_LINKS"],
    cooldown: 3,
    backlist: true,
    async execute(client, message, args, config, prefix) {
        
    const { commands } = message.client;
    const data = [];

    let avatar = client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 });

    if(!args.length) {
    
    const embed = new Discord.MessageEmbed()

    .setAuthor(`${client.user.username} - Control Panel`, client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
    .setThumbnail(avatar)
    .setDescription(`• 📍 Prefix: \`${config.aplication.prefix}\`
    • 🇧🇷 Language: [Discord JavaScript](https://nodejs.org/en/)
    • 🔧 Developer: [Byel#0001](https://byel.com)

    🏠 - **Inicio**
    ⭐ - **Diversão**
    👮 - **Moderação**
    📡 - **Utilitários**`)
    .setColor(colors.none)

    return message.channel.send(`${message.author}`, embed).then(msg => {
        
    msg.react('🏠').then(r => {
    msg.react('⭐').then(r => {
    msg.react('👮').then(r => {
    msg.react('📡').then(r => {

    const menuFilter = (reaction, user) => reaction.emoji.name === '🏠' && user.id === message.author.id;
    const divertFilter = (reaction, user) => reaction.emoji.name === '⭐' && user.id === message.author.id;
    const modFilter = (reaction, user) => reaction.emoji.name === '👮' && user.id === message.author.id;
    const utilsFilter = (reaction, user) => reaction.emoji.name === '📡' && user.id === message.author.id;

    const menu = msg.createReactionCollector(menuFilter);
    const divert = msg.createReactionCollector(divertFilter);
    const mod = msg.createReactionCollector(modFilter);
    const utils = msg.createReactionCollector(utilsFilter);

    const embeddivert = new Discord.MessageEmbed()

    .setAuthor(`⭐ Fun - [${commands.filter(command => command.category == "fun").size}]`)
    .setDescription(`Use o comando \`${prefix}ajuda [comando]\` para ver informações detalhadas para cada comando!

    • \`${commands.filter(command => command.category == "fun").map(command => command.name).join('\`, \`')}\`.`)
    .setColor(colors.none)

    const embedmoderation = new Discord.MessageEmbed()

    .setAuthor(`👮 Moderation - [${commands.filter(command => command.category == "mod").size}]`)
    .setDescription(`Use o comando \`${prefix}ajuda [comando]\` para ver informações detalhadas para cada comando!

    • \`${commands.filter(command => command.category == "mod").map(command => command.name).join('\`, \`')}\`.`)
    .setColor(colors.none)

    const embedutil = new Discord.MessageEmbed()

    .setAuthor(`📡 Utils - [${commands.filter(command => command.category == "utils").size}]`)
    .setDescription(`Use o comando \`${prefix}ajuda [comando]\` para ver informações detalhadas para cada comando!

    • \`${commands.filter(command => command.category == "utils").map(command => command.name).join('\`, \`')}\`.`)
    .setColor(colors.none)

    menu.on('collect', r2 => {
        r2.users.remove(message.author.id)
        msg.edit(embed)
    })

    divert.on('collect', r2 => {
        r2.users.remove(message.author.id)
        msg.edit(embeddivert)
    })

    mod.on('collect', r2 => {
        r2.users.remove(message.author.id)
        msg.edit(embedmoderation)
    })

    utils.on('collect', r2 => {
        r2.users.remove(message.author.id)
        msg.edit(embedutil)
    })

    })
    })
    })
    })
    })
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if(!command) {
        return message.channel.send(`:x: **|** ${message.author}, o comando que você solicitou não existe, os argumentos da mensagem!`);
    }

    data.push(`> 📁 Nome: \`${command.name}\``);

    if(command.aliases) data.push(`> 🗂️ Aliases: \`${command.aliases.join('\`, \`')}\``);
    if(command.description) data.push(`> \n> 📰 Descrição: **${command.description}**`);
    if(command.usage) data.push(`> \n> ✏️ Como usar: \`${prefix}${command.name} ${command.usage}\``);
    
    data.push(`> ⏰ Cooldown: \`${command.cooldown || 3} segundo(s)\``);

    const embedzin = new Discord.MessageEmbed()
            
    .setAuthor(`🤖 Ajuda`)
    .setDescription(data, { split: true })
    .setColor(colors.none)

    message.channel.send(embedzin)

    }
}