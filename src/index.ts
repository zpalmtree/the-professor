const config = require('./config');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in');
});

client.on('message', msg => {
    /* Don't do anything for bots */
    if (msg.author.bot) {
        return;
    }

    let role;

    for (role of config.roles) {
        if (msg.content == config.prefix + role.command) {
            /* Find the role object of the specified role */
            let roleObject = msg.guild.roles.find(val => val.name === role.name);

            /* Couldn't find role */
            if (!roleObject) {
                console.error('Failed to find role!');
                break;
            }

            /* Apply the role */
            msg.member.addRole(roleObject).then(() => {
                console.log('Added role');

                /* Find the reaction */
                const reaction = msg.guild.emojis.find(val => val.name == config.successEmoji);

                /* Couldn't find the reaction */
                if (!reaction) {
                    console.error('Failed to find emoji on server!');
                    return;
                }

                /* Add the reaction */
                msg.react(reaction).catch(console.error);

            }).catch(console.error);

            break;
        }
    }
});

client.login(config.token);
