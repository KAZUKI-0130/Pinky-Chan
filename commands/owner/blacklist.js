const Discord = require("discord.js");
const blacklist = require('../../database/blacklist')

module.exports = {
  name: "blacklist",
  aliases: ["badd"],
  description: "",
  category: "Developers",
  usage: "badd <mention/ID>",
  cooldown: 3,
  run: async (client, message, args) => {

    if(!["716678620546072578"].includes(message.author.id))
    return message.channel.send(
        `**Nope! | this command is dev only :smirk:**`
      );

    const user = client.users.cache.find(e => e.id == args[0]) || message.mentions.users.first();
    if(!user) return message.channel.send(":x: | Mention or enter a user's ID!");

    if(user.id === "716678620546072578") return message.channel.send(":x: | DuncrError: the developer is trying to blacklist himself :rofl:");

    blacklist.findOne({ id: user.id }, async(err, data) =>{ 
        if(err) throw err;
        if(data) {
        return message.channel.send(':x: | This user is already on the blacklist!')
    };
    
    
    data = new blacklist({ id: user.id })
    data.save().catch(err => message.channel.send(`:warning: | **${err.name}:** ${err.message}`))
    message.channel.send(`:white_check_mark: | **${user.tag}** was successfully added to the blacklist!`)
    

    })

  }
}
