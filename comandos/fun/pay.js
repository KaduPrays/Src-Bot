const Discord = require("discord.js");
const database = require("../../database.js");
const colors = require("../../colors.json");
const config = require("../../config.json");

module.exports = {
  name: "pay",
  description: "Envie coins para um usuário.",
  aliases: ["pagar"],
  category: "fun",
  ClientPerm: ["EMBED_LINKS"],
  cooldown: 3,
  backlist: true,
  async execute(client, message, args, config, prefix) {

    user = message.mentions.users.first();
    let razaod = args.slice(1).join(' ');

    database.Users.findOne({
    	"_id": message.author.id
    }, function (erro, documento) {
        if(documento) {
            if(message.mentions.users.size < 1) return message.reply({
                embed: {
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
                            "value": "```/pay [usuário] [quantia]```",
                            "inline": true
                        },
                        {
                            "name": "👉 Exemplo:",
                            "value": ` \`\`\`/pay @Jogador#0000 60\`\`\` `,
                            "inline": false
                        }
                    ]
                }
            });

            if(message.mentions.users.first().id == message.author.id) return message.channel.send(`🚫 | **${message.author.username}**, você não pode doar moedas para si mesmo.`);
            if(!razaod.length < 1) {
                if(parseInt(args[1]) > 0) {
                    if(args[1] < documento.coins + 1) {

                        database.Users.findOne({
                            "_id": message.mentions.users.first().id
                        }, function (errou, docs) {

                            if(docs) {

                                docs.coins += parseInt(args[1])
                                docs.save();
                                documento.coins -= parseInt(args[1])
                                documento.save();
                                message.channel.send(`🎁 | **${message.author.username}**, você enviou **${Number(args[1]).toLocaleString()}** moedas para **${message.mentions.users.first().username}**!`);

                            } else {
                                
                                message.channel.send(`🚫 | **${message.author.username}**, ${message.mentions.users.first().username} foi registrado no meu banco de dados, use o comando novamente!`)
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

                    } else {
                        message.channel.send(`🚫 | **${message.author.username}**, você não tem essas moedas para doar.`)
                    }
                } else {
                    message.channel.send(`🚫 | **${message.author.username}**, você não pode doar essa quantidade de moedas.`);
                }
            } else {
                message.reply({
                    embed: {
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
                                "value": "```/pay [usuário] [quantia]```",
                                "inline": true
                            },
                            {
                                "name": "👉 Exemplo:",
                                "value": ` \`\`\`/pay @Jogador#0000 60 \`\`\` `,
                                "inline": false
                            }
                        ]
                    }
                });
            }

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
  }
}