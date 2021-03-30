const Discord = require("discord.js");
const colors = require("../../colors.json");

module.exports = {
    name: "captcha",
    description: "Comando para ativar o sistema de captcha.",
    aliases: ["cp"],
    category: "mod",
    MemberPerm: ["ADMINISTRATOR"],
    ClientPerm: ["EMBED_LINKS"],
    cooldown: 3,
    async execute(client, message, args, config, prefix) {

        message.delete()

        const embed = new Discord.MessageEmbed()

            .setAuthor('🤖 Sistema de Verificação')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`> Seja bem-vindo ao Discord oficial da **Rede Silky**!
            > 
            > :white_small_square: Por questões de segurança de nosso servidor Discord, possuímos um sistema de autenticação automático, para proteger nosso servidor contra Bots. É bem fácil nosso sistema de registro para ter acesso ao nosso Discord! Basta reagir o emoji de :white_check_mark: abaixo que automaticamente você irá receber acesso ao nosso Discord.
            > 
            > Esperamos que tenha uma ótima experiência em nossos servidores! Lembre-se de ler o chat de regras de nosso servidor para que não haja problemas futuros, antes de começar a sua aventura em nossa rede.`)
            .setColor(colors.none)

        message.channel.send(embed).then(msg => {
            msg.react('✅')
        })
    }
}