const Discord = require("discord.js");
const colors = require("../../colors.json");
const client_neko = require('nekos.life');
const neko = new client_neko();

module.exports = {
    name: "slap",
    description: "Comando para lançar um tapa em um membro.",
    aliases: ["tapa"],
    category: "fun",
    ClientPerm: ["EMBED_LINKS"],
    usage: "[Membro]",
    cooldown: 3,
    async execute(client, message, args, emojis, colors, config, prefix) {
        
        let user = message.mentions.users.first() || client.users.cache.get(args[0]);

        if(!user) {
            return message.channel.send(`:x: **|** ${message.author}, você precisa mencionar uma pessoa para você bater!`);
        }

        let img = await neko.sfw.slap();

        const embed = new Discord.MessageEmbed()

            .setDescription(`${message.author} lançou um tapa em ${user}!`)
            .setImage(img.url)
            .setColor(colors.none)

        message.channel.send(`${message.author}`, embed)
    }
}