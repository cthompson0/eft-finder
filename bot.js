require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = `.`;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

// Delete specified channel if empty for 60 seconds.
    let channelList = client.channels.cache;

    setInterval(function() {
        channelList.map(channel => {
            if(channel.members.size <= 0) {
                channel.delete('Cleaning up empty voice channel..')
                .then(console.log("Channel clean up completed."))
                .catch(function(error) {console.log(error)
                });
            } 
        })

    }, 10 * 6000);
});


// Spin Up a New Voice Channel
// Things to Add:
// 1. Verify name matches a server code format.
// 2. Verify name does not currently exist.
// 3. House users in a lobby so the bot can move them.

client.on('message', async message => {
    if(message.content.startsWith(`${prefix}createChannel`)) {
        const args = message.content.slice(15);
        let userID = message.member.id;

        message.guild.channels.create(`${args}`, { type: 'voice' , permissionOverwrites: [
            {
                id: '726939553281212497',
                deny: ['VIEW_CHANNEL']
            },

            {
                id: userID,
                allow: ['VIEW_CHANNEL', 'CONNECT'],
            }
        ]})
        .then(channel => message.member.voice.setChannel(channel.id))
        .catch(function(error) {console.log(error)});

        console.log(`Created ${args} and moved ${message.member.user.username} successfully.`);

    }
});

client.login(process.env.DISCORD_TOKEN);
