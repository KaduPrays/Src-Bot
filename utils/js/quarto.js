module.exports = async function QUARTO(user, message, emoji7, bot) {
   
    const config = require('../../config.json');
    const colors = require('../../colors.json');
    const questions = require('../../utils/json/suggestion.json')
    const Discord = require("discord.js")

    const nome = `${emoji7}・${user.username}`
    const canal = bot.channels.cache.find(channel => channel.id === config.canais.sugestões)

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
        await channel.setTopic(`Esse canal será excluido depois de **10** minutos!`)
        await channel.send(`${user}`).then(msg => { msg.delete() })

        const msg = await channel.send({
            embed: {
                description: `Sejam bem-vindos a área de sugestões do ${message.guild.name}!\n\nAqui vocês podem enviar suas sugestões de melhorias e novidades que querem em nosso servidor! Antes de postar sua sugestão, verifique se algum membro já não tenha criado, ou que a sua sugestão já não tenha sido aceita/negada pela nossa equipe.\n\nCaso você queira continuar basta clicar na reação verde abaixo.`,
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.displayAvatarURL()
                },
                color: colors.none
            }
        })

        const aceitou = msg.createReactionCollector((r, u) => r.emoji.name === "✅" && u.id === user.id);
        const negou = msg.createReactionCollector((r, u) => r.emoji.name === "🚫" && u.id === user.id);

        await msg.react("✅")
        await msg.react("🚫")

        aceitou.on('collect', async a => {
            aceitou.stop()
            msg.delete()
            const collector = channel.createMessageCollector(m => m.author.id === user.id);
            let step = 0;
            const application = {};
            collector.on('collect', m => {
                Object.defineProperty(application, questions[step].key, {
                    enumerable: true,
                    value: m.content
                });
            });

            const question = questions[step];
            channel.send({
                embed: {
                    title: question.titulo,
                    description: question.descrição,
                    color: colors.none
                }
            });

            function finish(application = {}, message = Message, collector = MessageCollector) {
                collector.stop();
                channel.send({
                    embed: {
                        description: "**Sugestão registrada com sucesso!**",
                        author: {
                            name: bot.user.username,
                            icon_url: bot.user.displayAvatarURL()
                        },
                        color: colors.none,
                        timestamp: new Date(),
                        footer: {
                            text: user.username,
                            icon_url: user.displayAvatarURL()
                        }
                    }
                }).then(message => { setTimeout(() => { channel.delete() }, 1000) })
            }


            collector.on('collect', async m => {
                const question = questions[++step];
                if (step + 1 > questions.length) {
                    finish(application, message, collector);
                    return null;
                }
                channel.send({
                    embed: {
                        title: question.titulo,
                        description: question.descrição,
                        color: colors.none
                    }
                });
            });

            collector.on('end', async u => {
                canal.send({
                    embed: {
                        author: {
                            name: bot.user.username,
                            icon_url: bot.user.displayAvatarURL()
                        },
                        color: colors.none,
                        footer: {
                            text: `Sugestão enviada por ${user.tag}`,
                            icon_url: user.displayAvatarURL()
                        },
                        thumbnail: {
                            url: user.displayAvatarURL()
                        },
                        fields: [
                            {
                                name: `▫️ Nickname:`,
                                value: application.nickname,
                                inline: false
                            },
                            {
                                name: `▫️ Sugestão:`,
                                value: application.suggestion,
                                inline: false
                            },
                            {
                                name: `▫️ Por que deveria ser aceita::`,
                                value: application.because,
                                inline: false
                            }
                        ]
                    }
                }).then(async msg => {
                    await msg.react("👍🏻")
                    await msg.react("👎🏻")
                })
                return null;
            });
        });

        negou.on('collect', async a => {
            negou.stop()
            channel.delete()
        })
    });
}