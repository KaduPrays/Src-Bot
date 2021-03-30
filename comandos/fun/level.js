const Discord = require("discord.js");
const database = require("../../database.js");
const colors = require("../../colors.json");
const config = require("../../config.json");

module.exports = {
  name: "level",
  description: "Mostra seu level.",
  aliases: ["nivel", "xp"],
  category: "fun",
  ClientPerm: ["EMBED_LINKS"],
  cooldown: 3,
  backlist: true,
  async execute(client, message, args, config, prefix) {

    let user = message.mentions.users.first();
  	if(message.mentions.users.size < 1) {

    database.Users.findOne({
      "_id": message.author.id
    }, function (erro, documento) {

      if(documento) {

        var unbug = 300 * documento.level + 1

        message.reply({
          embed: {
            "description": `**Nível:** Nível ${documento.level}\n**XP Atual:** ${Number(documento.xp).toLocaleString()} / ${Number(unbug).toLocaleString()}\n**Progresso:** Faltam apenas **${Number(unbug - documento.xp).toLocaleString()}** de xp para o próximo nível!\n`,
            "author": {
              "name": `Informações de ${message.author.username}`,
              "icon_url": "https://cdn.discordapp.com/emojis/529033603045261312.gif?v=1"
            },
            "color": colors.none,
            "footer": {
              "text": `${message.author.username}`,
              "icon_url": `${message.author.displayAvatarURL()}`
            },
            "timestamp": new Date(),
          }
        })

      } else {
        
        message.channel.send(`🚫 | **${message.author.username}** use o comando novamente, por favor.`).then(message => { setTimeout(() => { message.delete() }, 6000) })
        var pessoa = new database.Users({
          _id: message.author.id,
          level: 0,
          xp: 0,
          coins: 0,
          udaily: 0,
          ddaily: 0
        })

        pessoa.save()

      }
    })
  
  } else {
    
    database.Users.findOne({
      "_id": message.mentions.users.first().id
    }, function (erro, documento) {

      if(documento) {

        var unbug = 300 * documento.level + 1

        message.reply({
          embed: {
            "description": `**Nível:** Nível ${documento.level}\n**XP Atual:** ${Number(documento.xp).toLocaleString()} / ${Number(unbug).toLocaleString()}\n**Progresso:** Faltam apenas **${Number(unbug - documento.xp).toLocaleString()}** de xp para o próximo nível!\n`,
            "author": {
              "name": `Informações de ${message.mentions.users.first().username}`,
              "icon_url": "https://cdn.discordapp.com/emojis/529033603045261312.gif?v=1"
            },
            "color": colors.none,
            "footer": {
              "text": `${message.author.username}`,
              "icon_url": `${message.author.displayAvatarURL()}`
            },
            "timestamp": new Date(),
          }
        })

      } else {
        
        message.channel.send(`🚫 | **${message.author.username}**, ${message.mentions.users.first().username} foi registrado no meu banco de dados, use o comando novamente!`).then(message => { setTimeout(() => { message.delete() }, 300000) })
        var pessoa = new database.Users({
          _id: message.mentions.users.first().id,
          level: 0,
          xp: 0,
          coins: 0,
          udaily: 0,
          ddaily: 0
        })

        pessoa.save()

      }
    })
  }
  }
}