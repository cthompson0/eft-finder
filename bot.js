require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = `.`;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const protectedChannels = ['730198448837492846', '730206632264466513'];
    let channelList = client.channels.cache;

    setInterval(function() {
        channelList.map(channel => {
            if(channel.members.size <= 0 && !protectedChannels.includes(channel.id))  {
                channel.delete('Cleaning up empty voice channel(s)..')
                .catch(function(error) {console.log(error)
                });
                console.log("Channel clean up completed.");
            } 
        })

    }, 10 * 6000);
});

client.on('message', async message => {
    if(message.content.startsWith(`${prefix}join`)) {
        const args = message.content.slice(6);
        let userID = message.member.id;
        let channelExists = message.guild.channels.cache.find(channel => channel.name == `${args}`);
        console.log(`${args}`);
        console.log(channelExists);

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
