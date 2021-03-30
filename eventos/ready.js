const Discord = require("discord.js");
const config = require("../config.json");
const colors = require("colors");

module.exports = async(client, message) => {
    const ping = new Date();
    ping.setHours(ping.getHours() - 3);

    let status = [
        { name: 'AntryHost', type: 'PLAYING', url: 'discord.gg/antry' }
    ];

    function setStatus() {
        let randomStatus = status[Math.floor(Math.random() * status.length)]
        client.user.setPresence({ activity: randomStatus, status: "idle" })
    };

    setStatus();
    setInterval(() => setStatus(), 30000);

    const guild = client.guilds.cache.get("793156182877536257");

    function setReady() {
        client.channels.cache.get("811295209060696065").setName(`Membros: ${guild.memberCount.toLocaleString()}`)
    }

    setInterval(() => setReady(), 5000);

    console.log(colors.green(`[LOGIN] - O Bot ${client.user.tag} foi inicializada com sucesso!`));
};