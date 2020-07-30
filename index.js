// herokuはポートリッスンしないと60sで落とされる
const express = require("express");
const port = process.env.PORT || 5000;
express().listen(port, function(){
    console.log("Listen!");
});

// postgresqlに接続する
const { Client } = require("pg");
const psql = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
psql.connect();

/*
psql.query("select * from guardians where name = 'アルテミス' order by name;", (err, res) => {
if (err) throw err;
  for (let row of res.rows) {
    console.log("[" + row.rarity + "] " + row.name + "\r\n\r\n○通常スキル\r\n" + row.damege + " CT：" + row.recast + "\r\n" + row.skill + "\r\n\r\n○編成スキル\r\n" + row.support);
  }
});
*/

// discordに接続する
const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const client = new Discord.Client();
client.once("ready", () => {
  console.log("Ready!");
});
client.once("reconnecting", () => {
  console.log("Reconnecting!");
});
client.once("disconnect", () => {
  console.log("Disconnect!");
});

// リスナー定義
client.on("message", async message => {

  // 投稿者がbotは無視する
  if (message.author.bot) return;

  if (message.content.indexOf("にんじん") != -1) {
    message.channel.send("たべたい");
    return;
  }
  if (message.content.indexOf("敗北者") != -1) {
    message.channel.send("取り消せよ……!! ハァ… 今の言葉……!!!");
    return;
  }

  if (message.content.startsWith("おしえて ")) {
    const args = message.content.split(" ");
    if (args.length > 1) {
      psql.query("select * from guardians where name = '" + args[1] + "' order by name;", (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          message.channel.send("[" + row.rarity + "] " + row.name + "\r\n\r\n○通常スキル\r\n" + row.damege + " CT：" + row.recast + "\r\n" + row.skill + "\r\n\r\n○編成スキル\r\n" + row.support);
        }
      });
    }
    return;
  }
});

client.login(process.env.TOKEN);

// herokuは1時間アクセスがないと落とされる
const https = require('https');
while (true) {
  const d1 = new Date();
  while (true) {
    const d2 = new Date();
    if (d2 - d1 > 60000) {
      return;
    }
  }
  https.get('https://queue-discord-app.herokuapp.com/', function(res) {
    console.log("Get!");
  });
}
