// herokuはポートリッスンしないと60sで落とされる
const express = require('express');
const port = process.env.PORT || 5000;
express().listen(port, function(){
    console.log("Listen!");
});

// 非公開情報は環境変数から取得する
const token = process.env.TOKEN;

const pg = require('pg');
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  client.query('select * from guardians order by name', function(err, result) {
    done();
    if(err) return console.error(err);
    console.log(result.rows);
  });
});

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

// メッセージ受信時
client.on("message", async message => {

  // 投稿者がbotは無視する
  if (message.author.bot) return;

  if (message.content.indexOf("にんじん") != -1) {
    message.channel.send("たべたい");
    return;
  }
});

client.login(token);
	