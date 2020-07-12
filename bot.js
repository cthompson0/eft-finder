require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = `.`;
const protectedChannels = ['730198448837492846', '730206632264466513'];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    let channelList = client.channels.cache;

    setInterval(function() {
        channelList.map(channel => {
            if(channel.members.size <= 0 && !protectedChannels.includes(channel.id))  {
                channel.delete('Cleaning up empty voice channel(s)..')
                .catch(function(error) {console.log(error)});
            } 
        })

    }, 10 * 30000);
});

client.on('message', async message => {
    if(message.content.startsWith(`${prefix}join`)) {
        let args = message.content.slice(6, 10).toUpperCase();
        let userID = message.member.id;
        let channelExists = message.guild.channels.cache.find(channel => channel.name == `${args}`);

        if (!channelExists) {
            message.guild.channels.create(`${args}`, { type: 'voice' , permissionOverwrites: [
                {
                    id: '726939553281212497',
                    deny: ['CONNECT']
                },

                {
                    id: userID,
                    allow: ['VIEW_CHANNEL', 'CONNECT'],
                }
            ]})
            .then(channel => message.member.voice.setChannel(channel.id))
            .catch(function(error) {console.log(error)});

            } else {
                message.member.voice.setChannel(channelExists.id);
            }
        }
});

client.login(process.env.DISCORD_TOKEN);
