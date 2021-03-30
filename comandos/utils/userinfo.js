const Discord = require("discord.js");
const database = require("../../database.js");
const colors = require("../../colors.json");
const config = require("../../config.json");

module.exports = {
    name: "userinfo",
    description: "Mostra as informações de um usuário.",
    aliases: ["uinfo"],
    category: "utils",
    ClientPerm: ["EMBED_LINKS"],
    cooldown: 3,
    backlist: true,
    async execute(client, message, args, config, prefix) {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    let avatar = message.member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 });
        
    function formatDate(template, date) {
    var specs = "YYYY:MM:DD:HH:mm:ss".split(":")
    date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
    return date
      	.toISOString()
      	.split(/[-:.TZ]/)
      	.reduce(function(template, item, i) {
        	return template.split(specs[i]).join(item)
      	}, template)
  	}

    if(message.mentions.users.size < 1) {

  	database.Users.findOne({
    	"_id": member.id
  	}, function (erro, documento) {

  	if(documento) {
        
    const status = {
      	online: ' `🟢` Online',
      	idle: ' `🟠` Ausente',
      	dnd: ' `🔴` Não pertubar',
      	offline: ' `⚫️` Offline'
    }
        
    const bot = member.user.bot ? '`🤖` Sim' : ' `🙂` Não'

    const embed = new Discord.MessageEmbed()

    .setAuthor(`👤 ${member.user.tag}`)
    .setThumbnail(avatar)
    .setDescription(`> Nome: ${member.user.username}
    > Nickname: ${member.nickname !== null ? `${member.nickname}` : 'Nenhum'}
	> ID: ${member.id}
	> Coins: ${Number(documento.coins).toLocaleString()}
	> Level: ${Number(documento.level).toLocaleString()}
	> Conta criada em: ${formatDate("DD/MM/YYYY, às HH:mm:ss", member.createdAt)}
	> Entrou em: ${formatDate("DD/MM/YYYY, às HH:mm:ss", member.joinedAt)}
	> Bot: ${bot}
	> Status: ${status[member.user.presence.status]}
	> Cargos: ${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(' **|** ') || 'Nenhum cargo'}`)
    .setColor(colors.none)

    message.channel.send(embed)

	} else {

    message.channel.send(`🚫 | **${member.username}** use o comando novamente, por favor.`).then(message => { setTimeout(() => { message.delete() }, 300000) })
    var pessoa = new database.Users({
    	_id: member.id,
    	level: 0,
    	xp: 0,
      	coins: 0,
      	udaily: 0,
      	ddaily: 0
    })

    pessoa.save()

    }

    })

	} else {

	database.Users.findOne({
      "_id": message.mentions.users.first().id
    }, function (erro, documento) {

    if(documento) {
       
    const status = {
      	online: ' `🟢` Online',
      	idle: ' `🟠` Ausente',
      	dnd: ' `🔴` Não pertubar',
      	offline: ' `⚫️` Offline'
    }
        
    const bot = member.user.bot ? '`🤖` Sim' : ' `🙂` Não'

   	const embed = new Discord.MessageEmbed()

    .setAuthor(`👤 ${member.user.tag}`)
    .setThumbnail(avatar)
    .setDescription(`> Nome: ${member.user.username}
    > Nickname: ${member.nickname !== null ? `${member.nickname}` : 'Nenhum'}
	> ID: ${member.id}
	> Coins: ${Number(documento.coins).toLocaleString()}
	> Level: ${Number(documento.level).toLocaleString()}
	> Conta criada em: ${formatDate("DD/MM/YYYY, às HH:mm:ss", member.createdAt)}
	> Entrou em: ${formatDate("DD/MM/YYYY, às HH:mm:ss", member.joinedAt)}
	> Bot: ${bot}
	> Status: ${status[member.user.presence.status]}
	> Cargos: ${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(' **|** ') || 'Nenhum cargo'}`)
    .setColor(colors.none)

    message.channel.send(embed)

	} else {

    message.channel.send(`🚫 | **${member.username}** use o comando novamente, por favor.`).then(message => { setTimeout(() => { message.delete() }, 300000) })
    var pessoa = new database.Users({
      	_id: message.mentions.users.first().id,
      	level: 0,
      	xp: 0,
      	coins: 0,
      	udaily: 0,
      	ddaily: 0
    })

    pessoa.save()
	
	}
    })
    }
    }
}