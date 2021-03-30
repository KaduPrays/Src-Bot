const Discord = require("discord.js");
const colors = require("../../colors.json");
const config = require("../../config.json");
const ms = require("ms");
const moment = require('moment');
moment.locale('pt-BR')
ms(60000, { long: true })

module.exports = {
    name: "tempmute",
    description: "Comando para mutar um membro.",
    aliases: ["cap"],
    category: "mod",
    MemberPerm: ["MUTE_MEMBERS"],
    ClientPerm: ["KICK_MEMBERS"],
    cooldown: 3,
    async execute(client, message, args, config, prefix) {

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!tomute) return message.channel.send(`🚫 | Argumento insuficiente.\n ▫ | **${message.author.username}**, o uso correto é: \`${config.aplication.prefix}tempmute @Jogador tempo motivo | provas\``).then(message => { setTimeout(() => { message.delete() }, 100000) })

    var [reason, prova] = args.slice(2).join(' ').split("|");
    if(!reason) reason = "Não informado."
    if(!prova) prova = "Não informado."

    let muterole = message.guild.roles.cache.find(role => role.id === config.cargos.muted)

    let mutetime = args[1];
    if(!mutetime) mutetime = "Tempo indeterminado."

    message.delete();

    let canal = client.channels.cache.get(config.canais.punições)
    if(!canal) return message.channel.send(`🚫 | **${message.author.username}**, canal de punições não foi encontrado.`);

    canal.send({
        embed: {
            description: `**Infrator:** \`${tomute.user.tag}\`\n**Infração:** \`${reason}\`\n**Duração:** \`${mutetime}\`\n\n**Autor:** \`${message.author.nickname || message.author.username}\` (${message.author})\n**Punição:** \`Silenciamento temporário.\`\n**Prova:** \`${prova}\``,
            author: {
                name: `[MUTE] ${tomute.user.tag}`,
                icon_url: `${tomute.user.displayAvatarURL()}`
            },
            color: colors.none,
            footer: {
                text: `${client.user.username}`,
                icon_url: `${client.user.displayAvatarURL()}`
            },
            thumbnail: { url: `${client.user.displayAvatarURL()}` },
            timestamp: new Date()
        }
    });

    await (tomute.roles.add(muterole));

    message.channel.send(`✅ | **${message.author.username}**, punição aplicada com sucesso.`)

    setTimeout(function () {
        tomute.roles.remove(muterole);
        client.users.cache.get(message.author.id).send(`⏲ | **${message.author.username}**, o silenciamento de ${tomute.user.username} foi revogado.`)
    }, ms(mutetime))
    }
}