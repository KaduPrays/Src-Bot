const Discord = require("discord.js");
const database = require("../../database.js");
const colors = require("../../colors.json");
const config = require("../../config.json");

let cooldown = new Set();
let cdseconds = 10 * 1000;

module.exports = {
  name: "coinflip",
  description: "Jogue uma moeda e tente a sorte.",
  aliases: ["flip", "apostar"],
  category: "fun",
  ClientPerm: ["EMBED_LINKS"],
  cooldown: 3,
  backlist: true,
  async execute(client, message, args, config, prefix) {

    if(cooldown.has(message.author.id)) {
        return message.channel.send(`🚫 **|** **${message.author.username}**, você precisa esperar 10 segundos para usar este comando novamente.`).then(message => { setTimeout(() => { message.delete() }, 10 * 1000) })
    }

    let razaou = args.slice(0).join(' ');
    var porcentagem = Math.round(Math.random() * 100)

    database.Users.findOne({
        "_id": message.author.id
    }, function (erro, documento) {

        if(documento) {
            if(!razaou.length < 1) {
                if(args[0] && args[0].toLowerCase() === 'cara') {
                    if(parseInt(args[1]) > 0) {
                        if(args[1] < documento.coins + 1) {
                            if(porcentagem < 89) {

                                documento.coins -= parseInt(args[1])
                                documento.save();
                                message.reply({
                                    embed: {
                                        "description": "**Girando...**",
                                        "color": colors.none,
                                        "image": { url: 'https://cdn.discordapp.com/attachments/488472706224750634/517874566404505600/moeda.gif' }
                                    }
                                }).then(msg => setTimeout(function () {
                                    msg.edit({
                                        embed: {
                                            "description": `${message.author}, você perdeu!\n**Você perdeu:** _${Number(args[1]).toLocaleString()} moedas_`,
                                            "author": {
                                                "name": `Coroa!`,
                                                "icon_url": "https://cdn.discordapp.com/emojis/514611826324013080.png?v=1"
                                            },
                                            "color": colors.none,
                                            "footer": {
                                                "text": `${message.author.username}`,
                                                "icon_url": `${message.author.displayAvatarURL()}`
                                            },
                                            "timestamp": new Date()
                                        }
                                    });
                                }, 6000))
                                cooldown.add(message.author.id)
                                setTimeout(() => {
                                    cooldown.delete(message.author.id)
                                }, cdseconds);

                            } else {

                                documento.coins += parseInt(args[1]) * 2
                                documento.save();
                                message.reply({
                                    embed: {
                                        "description": "**Girando...**",
                                        "color": colors.none,
                                        "image": { url: 'https://cdn.discordapp.com/attachments/488472706224750634/517874566404505600/moeda.gif' }
                                    }
                                }).then(msg => setTimeout(function () {
                                    msg.edit({
                                        embed:
                                        {
                                            "description": `${message.author}, você ganhou!\n**Você recebeu:** _${Number((parseInt(args[1]) * 2)).toLocaleString()} moedas_`,
                                            "author": {
                                                "name": `Cara!`,
                                                "icon_url": "https://cdn.discordapp.com/emojis/514611826324013080.png?v=1"
                                            },
                                            "color": colors.none,
                                            "footer": {
                                                "text": `${message.author.username}`,
                                                "icon_url": `${message.author.displayAvatarURL()}`
                                            },
                                            "timestamp": new Date()
                                        }
                                    });
                                }, 6000))
                                cooldown.add(message.author.id)
                                setTimeout(() => {
                                    cooldown.delete(message.author.id)
                                }, cdseconds);

                            }
                        } else {
                            message.channel.send(`🚫 | **${message.author.username}**, você não pode apostar essa quantidade de moedas.`)
                        }
                    } else {
                        message.channel.send(`🚫 | **${message.author.username}**, você não pode apostar essa quantidade de moedas.`)
                    }

                }



                if (args[0] && args[0].toLowerCase() === 'coroa') {
                    if (parseInt(args[1]) > 0) {

                        if (args[1] < documento.coins + 1) {

                            if (porcentagem < 89) {

                                documento.coins -= parseInt(args[1])
                                documento.save();
                                message.reply({
                                    embed: {
                                        "description": "**Girando...**",
                                        "color": colors.none,
                                        "image": { url: 'https://cdn.discordapp.com/attachments/488472706224750634/517874566404505600/moeda.gif' }
                                    }
                                }).then(msg => setTimeout(function () {
                                    msg.edit({
                                        embed: {
                                            "description": `${message.author}, você perdeu!\n**Você perdeu:** _${Number(args[1]).toLocaleString()} moedas_`,
                                            "author": {
                                                "name": `Cara!`,
                                                "icon_url": "https://cdn.discordapp.com/emojis/514611826324013080.png?v=1"
                                            },
                                            "color": colors.none,
                                            "footer": {
                                                "text": `${message.author.username}`,
                                                "icon_url": `${message.author.displayAvatarURL()}`
                                            },
                                            "timestamp": new Date()
                                        }
                                    });
                                }, 6000))
                                cooldown.add(message.author.id)
                                setTimeout(() => {
                                    cooldown.delete(message.author.id)
                                }, cdseconds);

                            } else {

                                documento.coins += parseInt(args[1]) * 2
                                documento.save();
                                message.reply({
                                    embed: {
                                        "description": "**Girando...**",
                                        "color": colors.none,
                                        "image": { url: 'https://cdn.discordapp.com/attachments/488472706224750634/517874566404505600/moeda.gif' }
                                    }
                                }).then(msg => setTimeout(function () {
                                    msg.edit({
                                        embed: {
                                            "description": `${message.author}, você ganhou!\n**Você recebeu:** _${Number((parseInt(args[1]) * 2)).toLocaleString()} moedas_`,
                                            "author": {
                                                "name": `Coroa!`,
                                                "icon_url": "https://cdn.discordapp.com/emojis/514611826324013080.png?v=1"
                                            },
                                            "color": colors.none,
                                            "footer": {
                                                "text": `${message.author.username}`,
                                                "icon_url": `${message.author.displayAvatarURL()}`
                                            },
                                            "timestamp": new Date()
                                        }
                                    });
                                }, 8000))
                                cooldown.add(message.author.id)
                                setTimeout(() => {
                                    cooldown.delete(message.author.id)
                                }, cdseconds);

                            }
                        } else {
                            message.channel.send(`🚫 | **${message.author.username}**, você não pode apostar essa quantidade de moedas.`)
                        }

                    } else {
                        message.channel.send(`🚫 | **${message.author.username}**, você não pode apostar essa quantidade de moedas.`)
                    }

                }

            } else {
                message.channel.send({
                    "embed": {
                        "description": "**Lados:**\ncara\ncoroa",
                        "author": {
                            "name": `${client.user.username}`,
                            "icon_url": `${client.user.displayAvatarURL()}`
                        },
                        "color": colors.none,
                        "footer": {
                            "text": `${message.author.username}`,
                            "icon_url": `${message.author.displayAvatarURL()}`
                        },
                        "timestamp": new Date(),
                        "fields": [
                            {
                                "name": "🤔 Como usar:",
                                "value": "```/coinflip [lado] [quantia]```",
                                "inline": true
                            },
                            {
                                "name": "👉 Exemplo:",
                                "value": "```/coinflip cara 100```"
                            }
                        ]
                    }
                })
            }

        } else {
            message.channel.send(`🚫 | **${message.author.username}** use o comando novamente, por favor.`).then(message => { setTimeout(() => { message.delete() }, 300000) })
            var pessoa = new database.Users({
                level: 0,
                xp: 0,
                coins: 0,
                udaily: 0,
                ddaily: 0
            })

            pessoa.save()
        }
    })

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds);
  }
}