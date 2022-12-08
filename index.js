const Discord = require("discord.js");
const fs = require("fs");
const intents = ["GUILDS"];
const client = new Discord.Client({ intents: intents });
const config = require("./config.js");
const functions = require("./functions.js");

// コマンドハンドリング
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
  console.log(`\u001b[32m===${folder} commands===\u001b[0m`);
const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
const command = require(`./commands/${folder}/${file}`);
try {
  client.commands.set(command.data.name, command);
  console.log(`${command.data.name} がロードされました。`);
 } catch (error) {
  console.log(`\u001b[31m${command.data.name} はエラーによりロードされませんでした。\nエラー内容\n ${error}\u001b[0m`);
}
}
console.log(`\u001b[32m===${folder} loaded===\u001b[0m`);
}

// イベントハンドリング
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventForders) {
  const event = require(`./events/${folder}/${file}`);
if (event.once) {
try {
  client.once(event.name, (...args) => event.execute(...args, client));
} catch (error) {
  console.error(`\u001b[31m[${yuika.timeToJST(Date.now(), true)}]\u001b[0m\n`, error)
}
} else {
try {
  client.on(event.name, (...args) => event.execute(...args, client));
} catch (error) {
  console.error(`\u001b[31m[${yuika.timeToJST(Date.now(), true)}]\u001b[0m\n`, error)
  }
 }
}

// コマンドが来た時
client.on("interactionCreate", async i => {
  if (!i.isCommand()) return;
  const command = client.commands.get(i.commandName);
  if (!command) return;

// DM専用コマンド
if (command.guildOnly && !i.inGuild()) {
  const embed = new Discord.MessageEmbed()
    .setTitle("エラー")
    .setDescription("このコマンドはDMでは実行できません。")
    .setColor("RED");
  i.reply({embeds: [embed]})
  return;
}

client.func = functions;
client.config = config;

// 実行
try {
  await command.execute(i, client);
  const log = new Discord.MessageEmbed()
    .setTitle("**Commands_Log**")
    .setDescription("")
    .setColor(config.color)
    .setTimestamp()
    .setThumbnail(i.user.displayAvatarURL({ dynamic: true }))
    .addField("__Command__", "```\n" + `${command.data.name}` + "\n```")
    .addField("__Server__", "```\n" + `NAME : ${i.guild.name}` + "\n" + `ID : ${i.guild?.id ?? "DM"}` + "\n```", true)
    .addField("__User__", "```\n" + `NAME : ${i.user.tag}` + "\n" + `ID : ${i.user.id}` + "\n```", true)
    .setFooter("")
  client.channels.fetch(config.logch.command).then(c => c.send({ embeds: [log] }));
    } catch (error) {
  console.error(error);
  }
 }
);

// エラー処理
process.on("uncaughtException", error => {
  console.error(`[${functions.timeToJST(Date.now(), true)}] ${error.stack}`);
  const embed = new Discord.MessageEmbed()
    .setTitle("ERROR - uncaughtException")
    .setDescription("```\n" + error.stack + "\n```")
    .setColor("RED")
    .setTimestamp();
  client.channels.fetch(config.logch.error).then(c => c.send({ embeds: [embed] }));
});
process.on("unhandledRejection", (reason, promise) => {
  console.error(`\u001b[31m[${functions.timeToJST(Date.now(), true)}] ${reason}\u001b[0m\n`, promise);
  const embed = new Discord.MessageEmbed()
    .setTitle("ERROR - unhandledRejection")
    .setDescription("```\n" + reason + "\n```")
    .setColor("RED")
    .setTimestamp();
  client.channels.fetch(config.logch.error).then(c => c.send({ embeds: [embed] }));
});

// APIサーバー (UptimeRobot用)
const express = require("express");
const app = express();

// ルーティングの設定
app.get("/", (req, res) => {
const data = {
  "message": "Hello world!",
}
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data);
});
app.listen(3000, () => {
  console.log(`Opened API Server`);
});

// ログイン
client.login(config.token);
