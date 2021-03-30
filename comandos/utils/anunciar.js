const Discord = require("discord.js");
const colors = require("../../colors.json");

module.exports = {
    name: "anunciar",
    description: "Envie um anúncio para seu servidor.",
    aliases: ["embed"],
    category: "utils",
    ClientPerm: ["EMBED_LINKS"],
    usage: "[Message]",
    cooldown: 3,
    async execute(client, message, args, config, prefix) {

    message.channel.send(`Em qual canal você deseja anunciar?`).then(msg =>{
        
    let cp = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1}) .on('collect', c => {
    canal = c.mentions.channels.first()

    if(!canal) {
    message.reply('Mencione um canal!')
    
    } else{
    
    message.channel.send('Qual a menssagem desse anuncio?').then(msg2 =>{
    let cl = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1}).on('collect', c => {
                        
    desc = c.content

    message.channel.send('Qual o titulo?').then(msg3 =>{
    let ck = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1}).on('collect', c =>{
    
    tittle = c.content

    message.channel.send(`Anuncio foi enviado com sucesso para ${canal}`)

    let embed = new Discord.MessageEmbed()

    .setColor(colors.none)
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setFooter(`Publicado por: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setTitle(tittle)
    .setDescription(desc)
                                
    canal.send(embed)
                                 
    })
    })
    })
    })
    }
    })
    })
    }
}