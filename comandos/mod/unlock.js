const Discord = require("discord.js");

module.exports = {
    name: "unlock",
    description: "Comando para realizar desbloqueio de canal!",
    aliases: ["desbloquear"],
    category: "mod",
    MemberPerm: ["MANAGE_MESSAGES"],
    ClientPerm: ["EMBED_LINKS", "MANAGE_CHANNELS"],
    cooldown: 10,
    async execute(client, message, args, config, prefix){
		if(!message.channel.permissionsFor(message.channel.guild.roles.everyone).has("SEND_MESSAGES", true)) {
            return message.channel.send(`:x: **|** ${message.author}, você não pode desbloquear esse canal para o cargo **Everyone**, pois ele já está desbloqueado! Use o comando \`${prefix}lock\` para desbloquear esse canal!`);
        }
        try {
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
                SEND_MESSAGES: true
            });
        } catch (error) {
            return message.channel.send(`:x: **|** ${message.author}, ocorreu um erro ao realizar o desbloqueio do canal, verifique as minhas permissões e tente novamente, caso ocorra o mesmo erro reporte para os meus desenvolvedores!`);
        } 

        message.channel.send(`:white_check_mark: **|** ${message.author}, o desbloqueio de mensagens no canal para o cargo **Everyone** foi realizado com sucesso! Caso queira bloquear, use o comando \`${prefix}lock\` no canal!`);
    }
}