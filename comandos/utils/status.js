const Discord = require("discord.js");
const colors = require("../../colors.json");
const axios = require("axios");

module.exports = {
    name: "status",
    description: "Mostra os status do servidor.",
    aliases: ["ip", "servidor", "online"],
    category: "mod",
    ClientPerm: ["EMBED_LINKS"],
    cooldown: 3,
    async execute(client, message, args, config, prefix) {

        message.delete()

    try {
        var ip = "redesilky.com"
        var url = 'https://api.mcsrvstat.us/2/' + ip
        var icone = "https://eu.mc-api.net/v3/server/favicon/" + ip

        await axios.get(url).then(function (response) {
            let players = response.data.players.online
            let playersmax = response.data.players.max
            let replace1 = `${response.data.motd.clean}`.replace(",", "\n")

            message.channel.send({
                embed: {
                    description: `\`\`\`${replace1}\`\`\`\ `,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    },
                    color: colors.yellow,
                    thumbnail: { url: `${icone}` },
                    fields: [
                        {
                            name: "🛰  Estatísticas:",
                            value: `- **Jogadores:** ${players}/${playersmax} \n- **Status:** Online \n- **Versão:** 1.8 - 1.16`,
                            inline: true
                        },
                        {
                            name: "📋 Informações:",
                            value: `- **IP:** jogar.redesilky.com\n- **Twitter: [@RedeSilky](https://twitter.com/RedeSilky)** \n- **Loja: [loja.redesilky.com](https://loja.redesilky.com)**`,
                            inline: false
                        }
                    ]
                }
            })

        })
    } catch (e) {

        const embed = new Discord.MessageEmbed()

            .setAuthor('📡 Status')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`> Atualmente, o servidor se encontra em fase de **recriação** e **reforma**. Com isto sendo feito, nosso servidor está inacessível e sem previsão de abertura.`)
            .addField('💛 Desenvolvimento', `Atualmente: **0** jogadores online.`)
            .addField('🎮 Endereço do servidor', `redesilky.com`, true)
            .addField('🛒 Loja', `[loja.redesilky.com](https://loja.redesilky.com)`, true)
            .setColor(colors.yellow)

        message.channel.send(embed)

    }
    }
}