const Discord = require("discord.js");
const colors = require("../../colors.json");
const config = require("../../config.json");
const moment = require('moment');
moment.locale('pt-BR')

module.exports = {
    name: "ban",
    description: "Comando para banir um usuário.",
    aliases: ["banir"],
    category: "mod",
    MemberPerm: ["BAN_MEMBERS"],
    ClientPerm: ["EMBED_LINKS"],
    cooldown: 3,
    async execute(client, message, args, config, prefix) {

    let mat = message.author.tag
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    let [reason, prova] = args.slice(1).join(' ').split("|");
    if (!reason) reason = "Não informado."
    if (!prova) prova = "Não informado."
    if (!member) return message.channel.send(`🚫 | Argumento insuficiente.\n ▫ | **${message.author.username}**, o uso correto é: \`${config.aplication.prefix}ban @Jogador motivo | provas\``).then(message => { setTimeout(() => { message.delete() }, 100000) })
    if (member.id === message.author.id) return message.channel.send(`🚫 | **${message.author.username}**, você não pode banir essa pessoa.`).then(message => { setTimeout(() => { message.delete() }, 100000) })
    if (!member.bannable) return message.channel.send(`🚫 | **${message.author.username}**, não consigo banir essa pessoa.`).then(message => { setTimeout(() => { message.delete() }, 100000) })

    message.delete();

    let canal = client.channels.cache.get(config.canais.punições)
    if (!canal) return message.channel.send(`🚫 | **${message.author.username}**, canal de punições não foi encontrado.`);

    member.ban(`${mat} | ${reason}`).then(() => {
        canal.send({
            embed: {
                description: `**Infrator:** \`${member.user.tag}\`\n**Infração:** \`${reason}\`\n**Duração:** \`Permanente.\`\n\n**Autor:** \`${message.author.nickname || message.author.username}\` (${message.author})\n**Punição:** \`Banimento.\`\n**Prova:** \`${prova}\``,
                author: {
                    name: `[BAN] ${member.user.tag}`,
                    icon_url: `${member.user.displayAvatarURL()}`
                },
                color: colors.none,
                footer: {
                    text: `${client.user.username}`,
                    icon_url: `${client.user.displayAvatarURL()}`
                },
                thumbnail: { url: `${client.user.displayAvatarURL()}` },
                timestamp: new Date(),
            }
        })
        message.channel.send(`✅ | **${message.author.username}**, punição aplicada com sucesso.`)
    })
    }
}