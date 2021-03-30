const Discord = require("discord.js");
const database = require("../../database.js");
const colors = require("../../colors.json");
const config = require("../../config.json");

module.exports = {
  name: "topcoins",
  description: "Mostra o rank de melhores coins.",
  aliases: ["rank", "leaderboard", "toprank"],
  category: "fun",
  ClientPerm: ["EMBED_LINKS"],
  cooldown: 3,
  backlist: true,
  async execute(client, message, args, config, prefix) {

  database.Users.findOne({
  "_id": message.author.id
  }, function (erromano, documentomano) {
    
  database.Users.find({}, function (erro, documento) {
  
  if(documento) {
  var position = documento.map(function (docu) {
  return {
    id: docu._id,
    coins: docu.coins
    }
  })
      
  position = position.sort(function (a, b) {
    return b.coins - a.coins
  })
        
  position = position.filter(function (a) {
    return client.users.cache.get(a.id)
  })
    
    var moneytop = "\n" + position.slice(0, 10).map((a, posicao) => `**${(posicao + 1)}º** <@${client.users.cache.get(a.id).id}> ➯ ${Number(a.coins).toLocaleString()} Moedas`).join("\n") + "";
    message.reply({
      "embed": {
      "description": moneytop,
      "author": {
      "name": "💰  Top Moedas!"
      },
            "color": colors.none,
            "footer": {
              "text": `Você tem ${Number(documentomano.coins).toLocaleString()} Moedas`,
              "icon_url": message.author.displayAvatarURL
            },
            "timestamp": new Date(),
          }
        })
      }
    })
  	})
    }
}