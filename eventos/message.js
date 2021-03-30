const Discord = require("discord.js");
const colors = require("colors");
const config = require("../config.json");
const cooldowns = new Discord.Collection();

module.exports = async (client, message) => {
    
    let prefix = config.aplication.prefix;

    if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
        return message.channel.send(`:white_check_mark: **|** ${message.author}, se você estiver em dúvida, meu prefixo é \`${prefix}\` e use o comando \`${prefix}ajuda\` para ver todos os meus comandos e funções.`);
    }

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if(!command) return;

    if(command.guildOnly && message.channel.type !== 'text') {
        return message.channel.send(`:x: **|** ${message.author}, este comando não pode ser executado em minha **DM**.`).then(msg => { msg.delete({ timeout: 7000 }) });
    }

    if(command.MemberPerm && !message.member.permissions.has(command.MemberPerm)) {
        
        let permissions = [];

        if(command.MemberPerm.includes('ADMINISTRATOR')) permissions.push(`\`Administrador\``);
        if(command.MemberPerm.includes('VIEW_AUDIT_LOG')) permissions.push(`\`Ver o registro de auditoria\``);
        if(command.MemberPerm.includes('MANAGE_GUILD')) permissions.push(`\`Gerenciar servidor\``);
        if(command.MemberPerm.includes('MANAGE_ROLES')) permissions.push(`\`Gerenciar cargos\``);
        if(command.MemberPerm.includes('MANAGE_CHANNELS')) permissions.push(`\`Gerenciar canais\``);
        if(command.MemberPerm.includes('KICK_MEMBERS')) permissions.push(`\`Expulsar membros\``);
        if(command.MemberPerm.includes('BAN_MEMBERS')) permissions.push(`\`Banir membros\``);
        if(command.MemberPerm.includes('CREATE_INSTANT_INVITE')) permissions.push(`\`Create Invite\``);
        if(command.MemberPerm.includes('CHANGE_NICKNAME')) permissions.push(`\`Alterar apelido\``);
        if(command.MemberPerm.includes('MANAGE_NICKNAMES')) permissions.push(`\`Gerenciar apelidos\``);
        if(command.MemberPerm.includes('MANAGE_EMOJIS')) permissions.push(`\`Gerenciar emojis\``);
        if(command.MemberPerm.includes('MANAGE_WEBHOOKS')) permissions.push(`\`Gerenciar webhooks\``);
        if(command.MemberPerm.includes('VIEW_CHANNEL')) permissions.push(`\`Ler canais de texto e ver canais de voz\``);
        if(command.MemberPerm.includes('SEND_MESSAGES')) permissions.push(`\`Enviar mensagens\``);
        if(command.MemberPerm.includes('SEND_TTS_MESSAGES')) permissions.push(`\`Enviar mensagens em TTS\``);
        if(command.MemberPerm.includes('MANAGE_MESSAGES')) permissions.push(`\`Gerenciar mensagens\``);
        if(command.MemberPerm.includes('EMBED_LINKS')) permissions.push(`\`Inserir links\``);
        if(command.MemberPerm.includes('ATTACH_FILES')) permissions.push(`\`Anexar arquivos\``);
        if(command.MemberPerm.includes('READ_MESSAGE_HISTORY')) permissions.push(`\`Ver histórico de mensagens\``);
        if(command.MemberPerm.includes('MENTION_EVERYONE')) permissions.push(`\`Mencionar @everyone, @here e todos os cargos\``);
        if(command.MemberPerm.includes('USE_EXTERNAL_EMOJIS')) permissions.push(`\`Usar emojis externos\``);
        if(command.MemberPerm.includes('ADD_REACTIONS')) permissions.push(`\`Adicionar reações\``);
        if(command.MemberPerm.includes('CONNECT')) permissions.push(`\`Conectar\``);
        if(command.MemberPerm.includes('SPEAK')) permissions.push(`\`Falar\``);
        if(command.MemberPerm.includes('STREAM')) permissions.push(`\`Vídeo\``);
        if(command.MemberPerm.includes('MUTE_MEMBERS')) permissions.push(`\`Silenciar membros\``);
        if(command.MemberPerm.includes('DEAFEN_MEMBERS')) permissions.push(`\`Ensurdecer membros\``);
        if(command.MemberPerm.includes('MOVE_MEMBERS')) permissions.push(`\`Mover membros\``);
        if(command.MemberPerm.includes('USE_VAD')) permissions.push(`\`Usar detecção de voz\``);
        if(command.MemberPerm.includes('PRIORITY_SPEAKER')) permissions.push(`\`Voz Prioritária\``);

        return message.channel.send(`:x: **|** ${message.author}, você não pode executar esses comandos, pois precisa das permissões de ${permissions.join(", ")}.`).then(msg => { msg.delete({ timeout: 15000 }) });
    };

    if(command.ClientPerm && !message.guild.members.cache.get(client.user.id).permissions.has(command.ClientPerm)) {
        let permissions = [];

        if(command.ClientPerm.includes('ADMINISTRATOR')) permissions.push(`\`Administrador\``);
        if(command.ClientPerm.includes('VIEW_AUDIT_LOG')) permissions.push(`\`Ver o registro de auditoria\``);
        if(command.ClientPerm.includes('MANAGE_GUILD')) permissions.push(`\`Gerenciar servidor\``);
        if(command.ClientPerm.includes('MANAGE_ROLES')) permissions.push(`\`Gerenciar cargos\``);
        if(command.ClientPerm.includes('MANAGE_CHANNELS')) permissions.push(`\`Gerenciar canais\``);
        if(command.ClientPerm.includes('KICK_MEMBERS')) permissions.push(`\`Expulsar membros\``);
        if(command.ClientPerm.includes('BAN_MEMBERS')) permissions.push(`\`Banir membros\``);
        if(command.ClientPerm.includes('CREATE_INSTANT_INVITE')) permissions.push(`\`Criar convite\``);
        if(command.ClientPerm.includes('CHANGE_NICKNAME')) permissions.push(`\`Alterar apelido\``);
        if(command.ClientPerm.includes('MANAGE_NICKNAMES')) permissions.push(`\`Gerenciar apelidos\``);
        if(command.ClientPerm.includes('MANAGE_EMOJIS')) permissions.push(`\`Gerenciar emojis\``);
        if(command.ClientPerm.includes('MANAGE_WEBHOOKS')) permissions.push(`\`Gerenciar webhooks\``);
        if(command.ClientPerm.includes('VIEW_CHANNEL')) permissions.push(`\`Ler canais de texto e ver canais de voz\``);
        if(command.ClientPerm.includes('SEND_MESSAGES')) permissions.push(`\`Enviar mensagens\``);
        if(command.ClientPerm.includes('SEND_TTS_MESSAGES')) permissions.push(`\`Enviar mensagens em TTS\``);
        if(command.ClientPerm.includes('MANAGE_MESSAGES')) permissions.push(`\`Gerenciar mensagens\``);
        if(command.ClientPerm.includes('EMBED_LINKS')) permissions.push(`\`Inserir links\``);
        if(command.ClientPerm.includes('ATTACH_FILES')) permissions.push(`\`Anexar arquivos\``);
        if(command.ClientPerm.includes('READ_MESSAGE_HISTORY')) permissions.push(`\`Ver histórico de mensagens\``);
        if(command.ClientPerm.includes('MENTION_EVERYONE')) permissions.push(`\`Mencionar @everyone, @here e todos os cargos\``);
        if(command.ClientPerm.includes('USE_EXTERNAL_EMOJIS')) permissions.push(`\`Usar emojis externos\``);
        if(command.ClientPerm.includes('ADD_REACTIONS')) permissions.push(`\`Adicionar reações\``);
        if(command.ClientPerm.includes('CONNECT')) permissions.push(`\`Conectar\``);
        if(command.ClientPerm.includes('SPEAK')) permissions.push(`\`Falar\``);
        if(command.ClientPerm.includes('STREAM')) permissions.push(`\`Vídeo\``);
        if(command.ClientPerm.includes('MUTE_MEMBERS')) permissions.push(`\`Silenciar membros\``);
        if(command.ClientPerm.includes('DEAFEN_MEMBERS')) permissions.push(`\`Ensurdecer membros\``);
        if(command.ClientPerm.includes('MOVE_MEMBERS')) permissions.push(`\`Mover membros\``);
        if(command.ClientPerm.includes('USE_VAD')) permissions.push(`\`Usar detecção de voz\``);
        if(command.ClientPerm.includes('PRIORITY_SPEAKER')) permissions.push(`\`Voz Prioritária\``);

        return message.channel.send(`:x: **|** ${message.author}, não consigo executar esses comandos, porque preciso das permissões de ${permissions.join(", ")} nesse servidor.`).then(msg => { msg.delete({ timeout: 15000 }) });
    };

    if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    };

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if(timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if(now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`:x: **|** ${message.author}, por favor, aguarde ${timeLeft.toFixed(1)} segundo(s) antes de executar o comando \`${command.name}\`.`).then(msg => { msg.delete({ timeout: 5000 }) });
        };
    };

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        await command.execute(client, message, args, config, prefix);
    } catch (error) {
        console.log(colors.red(`[ERRO] - Ocorreu um erro ao executar o comando.\nErro: ${error}`));
        return message.channel.send(`:gear: **|** ${message.author}, ocorre um erro ao executar este comando, recomendo que você relate esse erro no servidor de suporte para meus desenvolvedores.`).then(msg => { msg.delete({ timeout: 5000 }) });
    };
};