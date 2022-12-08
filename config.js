module.exports = {
  clientId: "858815192358977566",　//BotのID
  color: "0x1bff49",
  token: process.env.DISCORD_TOKEN,
dev: {
  testGuild: "1017320814233784340" //管理サーバーID
},

//実行ログ出力チャンネル
logch: {
  ready: "1017341812639281182", //起動ログ
  command: "1017320684713693244", //コマンドログ
  error: "1017320716867223562", //エラーログ
  //bot_join: "1017320765227536445", //Botの入退室ログ(停止)
 }
}
