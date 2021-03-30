const Discord = require("discord.js");
const colors = require("../../colors.json");
const config = require("../../config.json");
const moment = require('moment');
moment.locale('pt-BR')

module.exports = {
    name: "banidos",
    description: "Comando para listar os membros banidos.",
    aliases: ["listban"],
    category: "mod",
    MemberPerm: ["BAN_MEMBERS"],
    ClientPerm: ["EMBED_LINKS"],
    cooldown: 3,
    async execute(client, message, args, config, prefix) {

    let servidor = client.guilds.cache.get(`${config.discord.id}`)
    servidor.fetchBans().then(bans => {
        
        let bansmap = bans.map(user => `${user.user.username} (\`${user.user.id}\`)`).join('\n')
        message.channel.send(`${message.author}`, {
            embed: {
                "title": `${bans.size} Banimento${bans.size !== 1 ? 's' : ''}:`,
                "description": bansmap.length >= 1900 ? `${bansmap.substr(0, 1900)}...\n\n**Para o conforto de todos, essa mensagem foi abreviada porque ultrapassou 2.000 caracteres.**` : `${bansmap}` || "Nenhum banimento.",
                "author": {
                    "name": servidor.name || bot.user.username,
                    "icon_url": servidor.iconURL() || client.user.displayAvatarURL()
                },
                "color": colors.none,
                "footer": {
                    "icon_url": message.author.displayAvatarURL(),
                    "text": message.author.username
                },
                "timestamp": new Date(),
            }
        })
    })
    }
}