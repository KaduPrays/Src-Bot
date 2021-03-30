const Discord = require("discord.js");
const colors = require("../../colors.json");
const config = require("../../config.json");
const database = require("../../database.js");
const moment = require("moment");
require("moment-duration-format");
moment.locale("pt-BR");

module.exports = {
    name: "daily",
    description: "Pegue sua recompensa diaria.",
    aliases: ["diaria"],
    category: "fun",
    ClientPerm: ["EMBED_LINKS"],
    cooldown: 3,
    backlist: true,
    async execute(client, message, args, config, prefix) {

    var day1 = 100
    var day2 = 250
    var day3 = 400
    var day4 = 550
    var day5 = 700
    var day6 = 850
    var day7 = 1000

    database.Users.findOne({
        "_id": message.author.id
    }, function (erro, documento) {

        if(documento) {

            var dias = documento.ddaily
            var time = documento.udaily

            if(dias == 0) {
                var x = new Date().getTime();
                var tempo_minimo = 24 * 60 * 60 * 1000
                var a = new Date(tempo_minimo - (x - time))
                var z = a
                var hora = z.getHours();
                var minuto = z.getMinutes();
                var segundo = z.getSeconds()
                if (x - documento.udaily < tempo_minimo) return message.channel.send(`⌚ | **${message.author.username}**, você já coletou suas moedas diários, você podera coletar novamente depois de **${hora}** hora${hora !== 1 ? 's' : ''}, **${minuto}** minuto${minuto !== 1 ? 's' : ''} e **${segundo}** segundo${segundo !== 1 ? 's' : ''}.`);

                documento.udaily = new Date().getTime()
                documento.ddaily += 1
                documento.coins += day1
                documento.save()
                message.channel.send({
                    embed: {
                        "title": "Você recebeu:",
                        "description": `**${Number(day1).toLocaleString()}** Moedas!`,
                        "author": {
                            "name": "(1/7) Moedas diários!",
                            "icon_url": "https://cdn.discordapp.com/emojis/514611826324013080.png?v=1"
                        },
                        "color": colors.none,
                        //"thumbnail": { url: "https://cdn.discordapp.com/attachments/464270386943623188/493043759177793548/Dia_1.png" },
                        "footer": {
                            "text": `${message.author.username}`,
                            "icon_url": `${message.author.displayAvatarURL()}`
                        },
                        "timestamp": new Date(),
                    }
                });

            } else if(dias == 1) {
                var x = new Date().getTime();
                var tempo_minimo = 24 * 60 * 60 * 1000
                var a = new Date(tempo_minimo - (x - time))
                var z = a
                var hora = z.getHours();
                var minuto = z.getMinutes();
                var segundo = z.getSeconds()
                if(x - documento.udaily < tempo_minimo) return message.channel.send(`⌚ | **${message.author.username}**, você já coletou suas moedas diários, você podera coletar novamente depois de **${hora}** hora${hora !== 1 ? 's' : ''}, **${minuto}** minuto${minuto !== 1 ? 's' : ''} e **${segundo}** segundo${segundo !== 1 ? 's' : ''}.`);

                documento.udaily = new Date().getTime()
                documento.ddaily += 1
                documento.coins += day2
                documento.save()
                message.channel.send({
                    embed: {
                        "title": "Você recebeu:",
                        "description": `**${Number(day2).toLocaleString()}** Moedas!`,
                        "author": {
                            "name": "(2/7) Moedas diários!",
                            "icon_url": "https://cdn.discordapp.com/emojis/514611826324013080.png?v=1"
                        },
                        "color": colors.none,
                        //"thumbnail": { url: "https://cdn.discordapp.com/attachments/464270386943623188/493043761685725194/Dia_2.png" },
                        "footer": {
                            "text": `${message.author.username}`,
                            "icon_url": `${message.author.displayAvatarURL()}`
                        },
                        "timestamp": new Date(),
                    }
                });

            } else if(dias == 2) {
                var x = new Date().getTime();
                var tempo_minimo = 24 * 60 * 60 * 1000
                var a = new Date(tempo_minimo - (x - time))
                var z = a
                var hora = z.getHours();
                var minuto = z.getMinutes();
                var segundo = z.getSeconds()
                if(x - documento.udaily < tempo_minimo) return message.channel.send(`⌚ | **${message.author.username}**, você já coletou suas moedas diários, você podera coletar novamente depois de **${hora}** hora${hora !== 1 ? 's' : ''}, **${minuto}** minuto${minuto !== 1 ? 's' : ''} e **${segundo}** segundo${segundo !== 1 ? 's' : ''}.`);

                documento.udaily = new Date().getTime()
                documento.ddaily += 1
                documento.coins += day3
                documento.save()
                message.channel.send({
                    embed: {
                        "title": "Você recebeu:",
                        "description": `**${Number(day3).toLocaleString()}** Moedas!`,
                        "author": {
                            "name": "(3/7) Moedas diários!",
                            "icon_url": "https://cdn.discordapp.com/emojis/514611826324013080.png?v=1"
                        },
                        "color": colors.none,
                        //"thumbnail": { url: "https://cdn.discordapp.com/attachments/464270386943623188/493043765356003328/Dia_3.png" },
                        "footer": {
                            "text": `${message.author.username}`,
                            "icon_url": `${message.author.displayAvatarURL()}`
                        },
                        "timestamp": new Date(),
                    }
                });
            } else if(dias == 3) {

                var x = new Date().getTime();
                var tempo_minimo = 24 * 60 * 60 * 1000
                var a = new Date(tempo_minimo - (x - time))
                var z = a
                var hora = z.getHours();
                var minuto = z.getMinutes();
                var segundo = z.getSeconds()
                if(x - documento.udaily < tempo_minimo) return message.channel.send(`⌚ | **${message.author.username}**, você já coletou suas moedas diários, você podera coletar novamente depois de **${hora}** hora${hora !== 1 ? 's' : ''}, **${minuto}** minuto${minuto !== 1 ? 's' : ''} e **${segundo}** segundo${segundo !== 1 ? 's' : ''}.`);

                documento.udaily = new Date().getTime()
                documento.ddaily += 1
                documento.coins += day4
                documento.save()
                message.channel.send({
                    embed: {
                        "title": "Você recebeu:",
                        "description": `**${Number(day4).toLocaleString()}** Moedas!`,
                        "author": {
                            "name": "(4/7) Moedas diários!",
                            "icon_url": "https://cdn.discordapp.com/emojis/514611826324013080.png?v=1"
                        },
                        "color": colors.none,
                        //"thumbnail": { url: "https://cdn.discordapp.com/attachments/464270386943623188/493043772888973323/Dia_4.png" },
                        "footer": {
                            "text": `${message.author.username}`,
                            "icon_url": `${message.author.displayAvatarURL()}`
                        },
                        "timestamp": new Date(),
                    }
                });
            } else if(dias == 4) {

                var x = new Date().getTime();
                var tempo_minimo = 24 * 60 * 60 * 1000
                var a = new Date(tempo_minimo - (x - time))
                var z = a
                var hora = z.getHours();
                var minuto = z.getMinutes();
                var segundo = z.getSeconds()
                if(x - documento.udaily < tempo_minimo) return message.channel.send(`⌚ | **${message.author.username}**, você já coletou suas moedas diários, você podera coletar novamente depois de **${hora}** hora${hora !== 1 ? 's' : ''}, **${minuto}** minuto${minuto !== 1 ? 's' : ''} e **${segundo}** segundo${segundo !== 1 ? 's' : ''}.`);

                documento.udaily = new Date().getTime()
                documento.ddaily += 1
                documento.coins += day5
                documento.save()
                message.channel.send({
                    embed: {
                        "title": "Você recebeu:",
                        "description": `**${Number(day5).toLocaleString()}** Moedas!`,
                        "author": {
                            "name": "(5/7) Moedas diários!",
                            "icon_url": "https://cdn.discordapp.com/emojis/514611826324013080.png?v=1"
                        },
                        "color": colors.none,
                        //"thumbnail": { url: "https://cdn.discordapp.com/attachments/464270386943623188/493043774558044160/Dia_5.png" },
                        "footer": {
                            "text": `${message.author.username}`,
                            "icon_url": `${message.author.displayAvatarURL()}`
                        },
                        "timestamp": new Date(),
                    }
                });
            } else if(dias == 5) {

                var x = new Date().getTime();
                var tempo_minimo = 24 * 60 * 60 * 1000
                var a = new Date(tempo_minimo - (x - time))
                var z = a
                var hora = z.getHours();
                var minuto = z.getMinutes();
                var segundo = z.getSeconds()
                if(x - documento.udaily < tempo_minimo) return message.channel.send(`⌚ | **${message.author.username}**, você já coletou suas moedas diários, você podera coletar novamente depois de **${hora}** hora${hora !== 1 ? 's' : ''}, **${minuto}** minuto${minuto !== 1 ? 's' : ''} e **${segundo}** segundo${segundo !== 1 ? 's' : ''}.`);

                documento.udaily = new Date().getTime()
                documento.ddaily += 1
                documento.coins += day6
                documento.save()
                message.channel.send({
                    embed: {
                        "title": "Você recebeu:",
                        "description": `**${Number(day6).toLocaleString()}** Moedas!`,
                        "author": {
                            "name": "(6/7) Moedas diários!",
                            "icon_url": "https://cdn.discordapp.com/emojis/514611826324013080.png?v=1"
                        },
                        "color": colors.none,
                        //"thumbnail": { url: "https://cdn.discordapp.com/attachments/464270386943623188/493043777825406977/Dia_6.png" },
                        "footer": {
                            "text": `${message.author.username}`,
                            "icon_url": `${message.author.displayAvatarURL()}`
                        },
                        "timestamp": new Date(),
                    }
                });
            } else if(dias == 6) {

                var x = new Date().getTime();
                var tempo_minimo = 24 * 60 * 60 * 1000
                var a = new Date(tempo_minimo - (x - time))
                var z = a
                var hora = z.getHours();
                var minuto = z.getMinutes();
                var segundo = z.getSeconds()
                if(x - documento.udaily < tempo_minimo) return message.channel.send(`⌚ | **${message.author.username}**, você já coletou suas moedas diários, você podera coletar novamente depois de **${hora}** hora${hora !== 1 ? 's' : ''}, **${minuto}** minuto${minuto !== 1 ? 's' : ''} e **${segundo}** segundo${segundo !== 1 ? 's' : ''}.`);

                documento.udaily = new Date().getTime()
                documento.ddaily = 0
                documento.coins += day7
                documento.save()
                message.channel.send({
                    embed: {
                        "title": "Você recebeu:",
                        "description": `**${Number(day7).toLocaleString()}** Moedas!`,
                        "author": {
                            "name": "(7/7) Moedas diários!",
                            "icon_url": "https://cdn.discordapp.com/emojis/514611826324013080.png?v=1"
                        },
                        "color": colors.none,
                        "": { url: "https://cdn.discordapp.com/attachments/464270386943623188/493043780480401411/Dia_7.png" },
                        "footer": {
                            "text": `${message.author.username}`,
                            "icon_url": `${message.author.displayAvatarURL()}`
                        },
                        "timestamp": new Date(),
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