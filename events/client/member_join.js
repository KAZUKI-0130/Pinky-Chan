const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.on("guildMemberAdd", member => {
    if (member.guild.id !== "934001300553740318") return; // 指定のサーバー以外では動作しないようにする
    member.guild.channels.cache.get("1120320289956446279").send(${member.user}が参加しました！);
});

client.on("guildMemberRemove", member => {
    if (member.guild.id !== "934001300553740318") return; // 指定のサーバー以外では動作しないようにする
    member.guild.channels.cache.get("1120320289956446279").send(${member.user.tag}が退出しました。);
});
