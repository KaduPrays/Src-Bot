const Discord = require("discord.js");

module.exports = {
    name: "say",
    description: "Command to make me say what you want.",
    aliases: ["falar"],
    category: "utils",
    MemberPerm: ["MANAGE_GUILD"],
    ClientPerm: ["EMBED_LINKS", "MANAGE_GUILD"],
    usage: "[Conteúdo]",
    cooldown: 3,
    async execute(client, message, args, config, prefix) {
		
        const mchannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if(mchannel) {
            argsresult = args.slice(1).join(' ')
            message.delete().catch(O_o => { })
            mchannel.send(`${argsresult}`)
        
        } else {
            
            argsresult = args.join(' ')
            message.delete().catch(O_o => { })
            message.channel.send(`${argsresult}`)
        }
    }
}