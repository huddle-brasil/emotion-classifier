const Discord = require('discord.js');
const discordClient = new Discord.Client()

discordClient.on('ready', () => console.log("I am ready"))

discordClient.login(process.env.DISCORD_TOKEN)

module.exports = discordClient