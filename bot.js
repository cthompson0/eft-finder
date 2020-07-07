require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = `.`;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    let channelList = client.channels.cache;

    setInterval(function() {
        channelList.map(channel => {
            if(channel.members.size <= 0 && channel.id !== '730198448837492846')  {
                channel.delete('Cleaning up empty voice channel(s)..')
                .catch(function(error) {console.log(error)
                });
                console.log("Channel clean up completed.");
            } 
        })

    }, 10 * 1000);
});

client.on('message', async message => {
    if(message.content.startsWith(`${prefix}createChannel`)) {
        const args = message.content.slice(15);
        let userID = message.member.id;
        let channelExists = message.guild.channels.cache.find(channel => channel.name == `${args}`);

        if (!channelExists) {
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

            } else {
                message.member.voice.setChannel(channelExists.id);
                console.log(`Moved ${message.member.user.username} successfully.`);
            }
        }
});

client.login(process.env.DISCORD_TOKEN);
