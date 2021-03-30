const Discord = require("discord.js");
const colors = require("../../colors.json");
const client_neko = require('nekos.life');
const neko = new client_neko();

module.exports = {
    name: "hug",
    description: "Comando para abraçar um membro.", 
    aliases: ["abraçar"],
    category: "fun",
    ClientPerm: ["EMBED_LINKS"], 
    usage: "[Membro]",
    cooldown: 3,
    async execute(client, message, args, config, prefix) {
        
        let user = message.mentions.users.first() || client.users.cache.get(args[0]);

        if(!user) {
            return message.channel.send(`:x: **|** ${message.author}, você precisa mencionar uma pessoa para abraçar!`);
        }

        let img = await neko.sfw.hug();

        const embed = new Discord.MessageEmbed()
            
            .setDescription(`${message.author} abraçou ${user}!`)
            .setImage(img.url)
            .setColor(colors.none)

        message.channel.send(`${message.author}`, embed)
    }
}