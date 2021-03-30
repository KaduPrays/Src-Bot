const Discord = require("discord.js");
const colors = require("../../colors.json");
const config = require("../../config.json");
const moment = require('moment');
moment.locale('pt-BR')

module.exports = {
    name: "kick",
    description: "Comando para banir um usuário.",
    aliases: ["expulsar"],
    category: "mod",
    MemberPerm: ["KICK_MEMBERS"],
    ClientPerm: ["EMBED_LINKS"],
    cooldown: 3,
    async execute(client, message, args, config, prefix) {

    var [razao, prova] = args.slice(1).join(' ').split("|");
    if(!razao) razao = "Não informado."
    if(!prova) prova = "Não informado."
    var membro = message.mentions.members.first();

    if(!membro) return message.channel.send(`🚫 | Argumento insuficiente.\n ▫ | **${message.author.username}**, o uso correto é: \`${config.aplication.prefix}kick @Jogador motivo | provas\``).then(message => { setTimeout(() => { message.delete() }, 100000) })
    if(!membro.kickable) return message.channel.send(`🚫 | **${message.author.username}**, você não pode expulsar essa pessoa.`).then(message => { setTimeout(() => { message.delete() }, 100000) })

    membro.kick()
    message.delete();

    let canal = bot.channels.cache.get(config.canais.punições)
    if (!canal) return message.channel.send(`🚫 | **${message.author.username}**, canal de punições não foi encontrado.`);
    canal.send({
        embed: {
            description: `**Infrator:** \`${membro.user.tag}\`\n**Infração:** \`${razao}\`\n**Duração:** \`Permanente.\`\n\n**Autor:** \`${message.author.nickname || message.author.username}\` (${message.author})\n**Punição:** \`Expulsão.\`\n**Prova:** \`${prova}\``,
            author: {
                name: `[KICK] ${membro.user.tag}`,
                icon_url: `${membro.user.displayAvatarURL()}`
            },
            color: bot.cor,
            footer: {
                text: `${bot.user.username}`,
                icon_url: `${bot.user.displayAvatarURL()}`
            },
            timestamp: new Date(),
            thumbnail: { url: `${bot.user.displayAvatarURL()}` },
        }
    });
    	message.channel.send(`✅ | **${message.author.username}**, punição aplicada com sucesso.`)

    }
}