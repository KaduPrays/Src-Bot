const Discord = require("discord.js");
const fs = require("fs");
const { sep } = require("path");
const database = require("./database.js");

const client = new Discord.Client({ ws: { intents: new Discord.Intents().ALL } });
const config = require("./config.json");
const colors = require("./colors.json");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./eventos/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.on("message", async message => {

    var xpCol = new Set()
    let xpRDM = Math.round(Math.random() * 10)

    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    if (xpCol.has(message.author.id)) return;

    database.Users.findOne({
        "_id": message.author.id
    }, function(erro, documento) {
        if (documento) {
            var unbug = 300 * documento.level + 1

            if (documento.xp > unbug) {
                documento.xp += xpRDM
                documento.level += 1
                documento.coins += 1000

                message.channel.send(`🎉 | **${message.author.username}**, você subiu para o nível **${Number(documento.level).toLocaleString()}**!`)

                documento.xp = 0
                documento.save()
                xpCol.add(message.author.id)
                setTimeout(function() {
                    xpCol.delete(message.author.id)
                }, 10 * 1000)

            } else {

                documento.xp += xpRDM
                documento.save()
                xpCol.add(message.author.id)
                setTimeout(function() {
                    xpCol.delete(message.author.id)
                }, 10 * 1000)
            }

        } else {

            var pessoa = new database.Users({
                _id: message.author.id,
                level: 0,
                xp: 0,
                coins: 0,
                udaily: 0,
                ddaily: 0,
            })

            pessoa.save()
        }
    })
});

client.on("guildMemberAdd", async(member) => {

    const guild = client.guilds.cache.get(config.discord.id);

    const embed = new Discord.MessageEmbed()

    .setAuthor(`Bem-vindo(a) ${member.user.tag}`, client.user.displayAvatarURL())
        .setDescription(`> Seja bem-vindo à **AntryHost**, aqui você pode se comunicar com os nossos jogadores e ficar a par de todas as nossas novidades!`)
        .addField("🛒 Financeiro", `[financeiro.antryhost.com](https://financeiro.antryhost.com)`, true)
        .addField("🛒 Painel", `[app.antryhost.com](https://app.antryhost.com)`, true)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setColor(colors.cook)

    client.channels.cache.get(config.discord.welcome).send(`${member}`, embed)
    client.channels.cache.get("811295209060696065").setName(`Membros: ${guild.memberCount.toLocaleString()}`)

    let role = member.guild.roles.cache.get("793167232775618570");
    member.roles.add(role).catch(console.error);

});

client.on("raw", async dados => {
    database.Guilds.findOne({
        _id: config.discord.id
    }, async function(erro, documento) {

        if (!documento) return;
        var mensagem = documento.ticket;

        var emoji1 = "📨";
        var emoji2 = "🛒";
        var emoji3 = "🤖";
        var emoji4 = "💡";

        if (dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
        if (dados.d.message_id != mensagem) return

        if (dados.t === "MESSAGE_REACTION_ADD") {
            const user = client.users.cache.get(dados.d.user_id);
            const channel_a = client.channels.cache.get(dados.d.channel_id)

            const message = await channel_a.messages.fetch(dados.d.message_id);
            const emojiKey = (dados.d.emoji.id) ? `${dados.d.emoji.name}:${dados.d.emoji.id}` : dados.d.emoji.name;
            const reactions = message.reactions.cache.get(emojiKey);

            client.emit(dados[dados.t], reactions, user);
            reactions.users.remove(user.id)

            if (dados.d.emoji.name === emoji1) {
                const PRIMEIRO = require('./utils/js/primeiro')
                PRIMEIRO(user, message, emoji1, client)
            }

            if (dados.d.emoji.name === emoji2) {
                const SEGUNDO = require('./utils/js/segundo')
                SEGUNDO(user, message, emoji2, client)
            }

            if (dados.d.emoji.name === emoji3) {
                const TERCEIRO = require('./utils/js/terceiro')
                TERCEIRO(user, message, emoji3, client)
            }

            if (dados.d.emoji.name === emoji4) {
                const QUARTO = require('./utils/js/quarto')
                QUARTO(user, message, emoji4, client)
            }
        }
    })
});

/** client.on('raw', async dados => {

    if(dados.t !== "MESSAGE_REACTION_ADD") return;
    if(dados.d.message_id != "810907449221447690") return;

    const servidor = client.guilds.cache.get(config.discord.id)
    const membro = servidor.members.cache.get(dados.d.user_id)

    if(dados.t === "MESSAGE_REACTION_ADD") {
    if(dados.d.emoji.name === "✅") {

    const canals = servidor.channels.cache.get("810905352760459295")
    const message = canals.messages.fetch("810907449221447690").then(async m => {
    m.reactions.resolve("✅").users.remove(membro.id)
    })

    const alpha = fs.readFileSync('./utils/txt/alpha.txt', 'utf8')

    function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
    }

    const CaptchaMessage = getRandomInt(1000000)

    const NumCaptcha = CaptchaMessage;

    const CaptchaEmbed = new Discord.MessageEmbed()

    .setDescription('Escreva no chat o código de verificação abaixo. Lembrando que você só terá **1** chance para acerta-ló.')
    .setImage(`https://minecraftskinstealer.com/achievement/20/Aqui+est%C3%A1+seu+c%C3%B3digo/${NumCaptcha}`)
    .setColor(colors.none)
    
    const CaptchaEmbed2 = new Discord.MessageEmbed()

    .setDescription('Caso tenha algum problema envolvendo o captcha contate `Byel#0001` no privado.')
    .setColor(colors.none)

    const VerificandoEmbed = new Discord.MessageEmbed()
    
    .setDescription('Verificando...')
    .setColor(colors.none)

    const VerificadoEmbed = new Discord.MessageEmbed()

    .setDescription('Verificado com **sucesso.**\nVolte ao servidor para **aproveitar** nossa **comunidade.**')
    .setColor(colors.none)
    
    const ErradoEmbed = new Discord.MessageEmbed()
    
    .setDescription('Você digitou o código **errado**.\nVá ao **servidor** e clique novamente na **reação** de **captcha** para refazer.')
    .setColor(colors.none)
    
    membro.send(CaptchaEmbed).catch(error => {
        return null
    })
    membro.send(CaptchaEmbed2).catch(error => {
        return null
    })
    membro.createDM().then(c => {

    const f1 = m => alpha && m.author.id === membro.id;
    const c1 = c.createMessageCollector(f1, { max: 1, time: 5 * 60 * 1000 });

    c1.on('collect', m1 => {
    const resp1 = m1.content;

    if(resp1 === `${NumCaptcha}`) {
    membro.roles.add('802229135225258045')

    membro.send(VerificandoEmbed).then(m => {
    setTimeout(function() {
        m.edit(VerificadoEmbed);
    }, 3000)
    })
    } else {

    membro.send(VerificandoEmbed).then(m => {
    setTimeout(function() {
    m.edit(ErradoEmbed)

    }, 3000)
    })
    }
    })
    })
    }
    }
}); **/

client.login(config.aplication.token);