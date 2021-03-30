const Discord = require("discord.js");
const database = require("../../database.js");
const colors = require("../../colors.json");
const config = require("../../config.json");

module.exports = {
  name: "toplevels",
  description: "Mostra o rank de top levels.",
  aliases: ["levelstop", "ranklevel"],
  category: "fun",
  ClientPerm: ["EMBED_LINKS"],
  cooldown: 3,
  backlist: true,
  async execute(client, message, args, config, prefix) {

    database.Users.findOne({
        "_id": message.author.id
    }, function (erromano, documano) {
        database.Users.find({}, function (erro, documento) {
            if(documento) {
                var position = documento.map(function (docu) {
                    return {
                        id: docu._id,
                        level: docu.level,
                        xp: docu.xp
                    }
                })
                
                position = position.sort(function (a, b) {
                    return b.level - a.level
                    return b.xp - a.xp
                })
                
                position = position.filter(function (a) {
                    return client.users.cache.get(a.id)
                })
                
                var toplevel = "\n" + position.slice(0, 10).map((a, posicao) => "**" + (posicao + 1) + "º** " +
                    `<@${client.users.cache.get(a.id).id}> ➯ Nível **${a.level}** (${Number(a.xp).toLocaleString()}/${Number(300 * a.level + 1).toLocaleString()})`).join("\n") + "";
                message.channel.send({
                    "embed": {
                        "description": toplevel,
                        "author": {
                            "name": "Classificação de níveis",
                            "icon_url": "https://images-ext-2.discordapp.net/external/CBC2tWgRnyWAZfOhlXKOSGBs0qrUVYMqEvVYRta3xZY/%3Fv%3D1/https/cdn.discordapp.com/emojis/467100485120163850.gif"
                        },
                        "color": colors.none,
                        "footer": {
                            "text": message.author.username,
                            "icon_url": message.author.displayAvatarURL()
                        },
                        "timestamp": new Date(),
                    }
                })
            }
        })
    })
  }
}