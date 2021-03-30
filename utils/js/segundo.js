const fs = require('fs');
const moment = require("moment");
var momente = require('moment-timezone');
moment.locale('pt-BR')
momente().tz("America/Sao_Paulo").format();

module.exports = async function SEGUNDO(user, message, emoji2, bot) {

    const Discord = require("discord.js");
    const colors = require("../../colors.json");
    const config = require("../../config.json");

    const nome = `${emoji2}・${user.username}`

    let category = message.guild.channels.cache.find(canal => canal.id === config.canais.CategoriaDoTicket)
    message.guild.channels.create(nome, {
        type: 'text',
        parent: category.id,
        permissionOverwrites: [
            {
                allow: Discord.Permissions.ALL,
                id: message.guild.roles.cache.find(role => role.id === config.cargos.suporte)
            },
            {
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
                id: user.id
            },
            {
                deny: Discord.Permissions.ALL,
                id: message.guild.roles.everyone.id
            }
        ]
    }).then(async channel => {
        await channel.setTopic(`Esse canal será excluido depois de **10** minutos!`).then(topic => {
            setTimeout(() => {
                channel.delete()
            }, 10 * 60 * 1000)
        });
        
        await channel.send(`<@&${config.cargos.suporte}>`).then(msg => { msg.delete() })
        await channel.send(`${user}`).then(msg => { msg.delete() })
        channel.send({
            embed: {
                title: `▫️ Aberto dia ${momente(new Date()).tz("America/Sao_Paulo").format('LLL')}`,
                description: "Envie sua pergunta no chat, tentando explicá-la em detalhes.\nPara fechar esse canal de suporte basta clicar na reação abaixo:",
                color: colors.none
            }
        }).then(async msg => {
            msg.react("🔒");

            const reaction = msg.createReactionCollector((reaction, user) => ['🔒', '✅', '🚫'].includes(reaction.emoji.name) && user.bot === false);

            reaction.on('collect', async r => {
                await msg.react("✅")
                await msg.react("🚫")

                switch (r.emoji.name) {
                    case "✅":
                        await msg.reactions.removeAll();
                        await channel.updateOverwrite(user, {
                            VIEW_CHANNEL: false,
                            SEND_MESSAGES: false,
                            READ_MESSAGE_HISTORY: false
                        });

                        channel.send({
                            embed: {
                                description: `Suporte fechado por ${r.users.cache.find(user => user.bot === false)}!`,
                                color: colors.none
                            }
                        }).then(async a => {
                            channel.send({
                                embed: {
                                    description: `🗑️ Excluir o canal`,
                                    color: colors.none
                                }
                            }).then(async mensagem => {
                                await msg.reactions.removeAll();
                                await mensagem.react("🗑️")

                                const Excluir = mensagem.createReactionCollector((r, u) => r.emoji.name === "🗑️" && u.bot === false);

                                Excluir.on('collect', async r => {
                                    let canal = message.guild.channels.cache.get(channel.id)
                                    let messages = canal.messages.cache.map(msg => `[${moment(msg.createdAt).format('LTS')}] [${bot.user.username}] [${msg.author.tag}] [CHAT] ${msg.author.username}: ${msg.content}`)

                                    var logs = bot.channels.cache.get(config.canais.RegistroSuporte)
                                    if (!logs) return;

                                    const letras = '1234';
                                    var aleatorio = '';
                                    for (var i = 0; i < 4; i++) {
                                        var rnum = Math.floor(Math.random() * letras.length);
                                        aleatorio += letras.substring(rnum, rnum + 1);
                                    }

                                    fs.writeFileSync(`${aleatorio}.txt`, messages.join('\n'), 'utf8')

                                    logs.send(`🗃️ | **REGISTRO DO SUPORTE**\n▫ **Staff:** ${r.users.cache.find(user => user.bot === false).tag}\n▫ **Membro:** ${user.tag}\n▫ **Data:** ${momente(new Date()).tz("America/Sao_Paulo").format('LLL')}\n▫ **ID:** ${user.id}`, { files: [`${aleatorio}.txt`] })
                                    setTimeout(function () {
                                        fs.unlink(`${aleatorio}.txt`, (err) => {
                                            if (err) throw err;
                                        });
                                    }, 30 * 1000);
                                    channel.send({
                                        embed: {
                                            description: `Esse canal será excluído em **10** segundos!`,
                                            color: colors.none
                                        }
                                    }).then(msg => {
                                        setTimeout(() => {
                                            channel.delete();
                                        }, 10 * 1000)
                                    })
                                })
                            })
                        })
                    break;
                }

                switch (r.emoji.name) {
                    case "🚫":
                        await msg.reactions.removeAll();
                        await msg.react("🔒")
                        break;
                }
            })
        })
    })
}