const Discord = require("discord.js");
const colors = require("../../colors.json");

module.exports = {
    name: "servericon",
    description: "Comando para mostrar o icone do servidor.",
    aliases: ["svicon"],
    category: "utils",
    ClientPerm: ["EMBED_LINKS"],
    cooldown: 3,
    async execute(client, message, args, config, prefix) {
		
        let avatar = client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 });

        let embed = new Discord.MessageEmbed()
            
            .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })) 
            .setDescription(`Caso queira baixar a foto, aperte [aqui](${avatar})`)
            .setImage(avatar)
            .setColor(colors.none)
            
        await message.channel.send(embed)
    }
}