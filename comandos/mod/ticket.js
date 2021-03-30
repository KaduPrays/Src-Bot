const Discord = require("discord.js");
const colors = require("../../colors.json");
const database = require("../../database.js")

module.exports = {
    name: "ticket",
    description: "Comando para ativar o sistema de ticket.",
    aliases: ["suporte"],
    category: "mod",
    MemberPerm: ["ADMINISTRATOR"],
    ClientPerm: ["EMBED_LINKS"],
    cooldown: 3,
    async execute(client, message, args, config, prefix) {

    message.delete()

    database.Guilds.findOne({
        _id: message.guild.id
    }, async function (erro, documento) {

        message.channel.send({
            embed: {
                author: {
                    name: '📫 Ticket'
                },
                description: `• Está precisando de alguma ajuda?
                • Selecione por favor a categoria que deseja ser atendido.

                📨 - para qualquer tipo de dúvida relacionada ao servidor;
                🛒 - para dúvidas relacionadas a compras;
                🤖 - para reportar um bug do servidor.

                • Assim que você escolher, um canal será criado.
                • Qualquer tipo de abuso do suporte resultará em punição imediata.`,

                color: colors.cook,
                thumbnail: {
                    url: `${client.user.displayAvatarURL()}`
                }
            }
        }).then(async msg => {
            await msg.react("📨")
            await msg.react("🛒")
            await msg.react("🤖")

            setTimeout(() => {
                if (documento) {
                    documento.ticket = msg.id
                    documento.category = msg.channel.parentID
                    documento.channel = msg.channel.id
                    documento.save()
                } else {
                    var guild = new database.Guilds({
                        _id: message.guild.id,
                        ticket: msg.id,
                        category: msg.channel.parentID,
                        channel: msg.channel.id
                    })
                    guild.save()
                }
            }, 10 * 1000)
        })
    })
}
}