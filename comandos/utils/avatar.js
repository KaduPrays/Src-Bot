const Discord = require("discord.js");
const colors = require("../../colors.json");

module.exports = {
    name: "avatar",
    description: "Comando para mostrar o avatar de um usuário.",
    aliases: ["icon"],
    category: "utils",
    ClientPerm: ["EMBED_LINKS"],
    usage: "[Membro](Opcional)",
    cooldown: 3,
    async execute(client, message, args, config, prefix) {
		
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let avatar = user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 });

        let embed = new Discord.MessageEmbed()
            
            .setAuthor(`${user.tag}`, user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })) 
            .setDescription(`Caso queira baixar a foto, aperte [aqui](${avatar})`)
            .setImage(avatar)
            .setColor(colors.none)
            
        await message.channel.send(embed)
    }
}