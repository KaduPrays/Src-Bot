const Discord = require("discord.js");
const database = require("../../database.js");
const colors = require("../../colors.json");
const config = require("../../config.json");

module.exports = {
  name: "coins",
  description: "Mostra sua quantia de coins.",
  aliases: ["money"],
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

  message.reply({
  
  embed: {
    "description": `${message.author}\n**Você tem:** ${Number(documento.coins).toLocaleString()} moedas.`,
    "author": {
      "name": "Moedas!",
      "icon_url": "https://images-ext-1.discordapp.net/external/nxPwzSvgt3Ph7KSIfarLRFpgHSDMz2oEY0U6O0YYEJI/%3Fv%3D1/https/cdn.discordapp.com/emojis/452955979349491714.png"
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

    message.channel.send(`🚫 | **${message.author.username}** use o comando novamente, por favor.`).then(message => { setTimeout(() => { message.delete() }, 300000) })
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

    message.reply({
      embed: {
        "description": `${message.mentions.users.first()}\n**Está com:** ${Number(documento.coins).toLocaleString()} moedas.`,
        "author": {
        "name": "Moedas!",
        "icon_url": "https://images-ext-1.discordapp.net/external/nxPwzSvgt3Ph7KSIfarLRFpgHSDMz2oEY0U6O0YYEJI/%3Fv%3D1/https/cdn.discordapp.com/emojis/452955979349491714.png"
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