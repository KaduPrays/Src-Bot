const Discord = require("discord.js");

module.exports = {
    name: "lock",
    description: "Comando para realizar bloqueio de canal!",
    aliases: ["bloquear"],
    category: "mod",
    MemberPerm: ["MANAGE_MESSAGES"],
    ClientPerm: ["EMBED_LINKS", "MANAGE_CHANNELS"],
    cooldown: 10,
    async execute(client, message, args, config, prefix) {
		if(!message.channel.permissionsFor(message.channel.guild.roles.everyone).has("SEND_MESSAGES", false)) {
            return message.channel.send(`:x: **|** ${message.author}, você não pode bloquear esse canal para o cargo **Everyone**, pois ele já está bloqueado! Use o comando \`${prefix}unlock\` para desbloquear esse canal!`);
        }
        try {
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
                SEND_MESSAGES: false
            });
        } catch (error) {
            return message.channel.send(`:x: **|** ${message.author}, ocorreu um erro ao realizar o bloqueio do canal, verifique as minhas permissões e tente novamente, caso ocorra o mesmo erro reporte para os meus desenvolvedores!`);
        } 

        message.channel.send(`:white_check_mark: **|** ${message.author}, o bloquei de mensagens no canal para o cargo **Everyone** foi realizado com sucesso! Caso queira desbloquear, use o comando \`${prefix}unlock\` no canal!`);
    }
}