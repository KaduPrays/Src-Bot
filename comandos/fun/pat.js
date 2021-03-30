const Discord = require("discord.js");
const colors = require("../../colors.json");
const client_neko = require('nekos.life');
const neko = new client_neko();

module.exports = {
    name: "pat",
    description: "Comando para acariciar um membro.",
    aliases: ["acariciar"],
    category: "fun",
    ClientPerm: ["EMBED_LINKS"],
    usage: "[Membro]",
    cooldown: 3,
    async execute(client, message, args, emojis, colors, config, prefix){
        
        let user = message.mentions.users.first() || client.users.cache.get(args[0]);

        if(!user) {
            return message.channel.send(`:x: **|** ${message.author}, você precisa mencionar uma pessoa para acariciar!`);
        }

        let img = await neko.sfw.pat();

        const embed = new Discord.MessageEmbed()

            .setDescription(`${message.author} acariciou ${user}!`)
            .setImage(img.url)
            .setColor(colors.none)

        message.channel.send(`${message.author}`, embed);
    }
}