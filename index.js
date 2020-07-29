// herokuはポートリッスンしないと60sで落とされる
const express = require('express');
const port = process.env.PORT || 5000;
express().listen(port, function(){
    console.log("Listen!");
});

// postgresqlに接続する
const { Client } = require('pg');
const psql = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
psql.connect();

    psql.query("select * from guardians where name = 'アルテミス' order by name;", (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.rarity + " " + JSON.name + "\r\n" + JSON.damege + " " + JSON.recast + "\r\n" + JSON.skill + "\r\n" + JSON.support);
      }
    });

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

  /*
  if (message.content.startsWith("/search ")) {
    const args = message.content.split(" ");
    psql.query("select * from guardians where name = '" + args[1] + "' order by name;", (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
    });
  }
  */

});

client.login(process.env.TOKEN);
