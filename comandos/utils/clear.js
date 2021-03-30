const Discord = require("discord.js");

module.exports = {
    name: "clear",
    description: "Comando para realizar uma limpeza no canal.",
    aliases: ["limpar"],
    category: "utils",
    MemberPerm: ["MANAGE_MESSAGES"],
    ClientPerm: ["EMBED_LINKS", "MANAGE_MESSAGES"],
    usage: "[Quantidade]",
    cooldown: 5,
    async execute(client, message, args, config, prefix) {
        
        const deleteCount = parseInt(args[0], 10)

        if(!deleteCount || deleteCount < 1 || deleteCount > 100) {
            return message.channel.send(`${message.author}, você precisa inserir um valor de **1** a **100** mensagens para realizar a limpeza.`)
        }

        const fetched = await message.channel.messages.fetch({ limit: deleteCount })
            
            message.channel.send(`:white_check_mark: **|** ${message.author}, você fez a limpeza de **${args[0]}** mensagens nesse canal.`).then(message => { setTimeout(() => { message.delete() }, 5000) })
            message.channel.bulkDelete(fetched).catch(error => {

            return message.channel.send(`${message.author}, ocorreu um erro ao realizar a limpeza no canal.`)
        })
    }
}