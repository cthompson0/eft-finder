require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = `.`;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

// Delete specified channel if empty for 10 seconds.
// To Do:
// Scan all channels for member size every x seconds && delete if empty

    let chan = client.channels.cache.get('726952777753821485');
    let mem = chan.members;
    console.log(chan.members.size);
    mem.map(member => console.log(member.user.username));

    setInterval(function() {
        if(chan && chan.members.size <= 0) {
            chan.delete('Cleaning up old server..')
            .then(console.log("Channel clean up completed."))
            .catch(function(error) {console.log(error)
            });
        } 
    }, 10 * 1000);
});


// Spin Up a New Voice Channel
// Things to Add:
// 1. Verify name matches a server code format.
// 2. Verify name does not currently exist.
// 3. Set VoiceChannel permissions.
// 4. House users in a lobby so the bot can move them.

client.on('message', async message => {
    if(message.content.startsWith(`${prefix}createChannel`)) {
        const args = message.content.slice(15);

        message.guild.channels.create(`${args}`, { type: 'voice' })
        .then(channel => message.member.voice.setChannel(channel.id));

        console.log(`Created ${args} and moved ${message.member.user.username} successfully.`);

    }
});

client.login(process.env.DISCORD_TOKEN);
