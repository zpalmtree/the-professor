const config = require('./config');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in');
});

export function addReaction(emoji, message): void {
    /* Find the reaction */
    const reaction = message.guild!.emojis.resolve(emoji);

    /* Couldn't find the reaction */
    if (!reaction) {
        console.error(`Failed to find emoji: ${emoji} on the server!`);
        return;
    }

    /* Add the reaction */
    message.react(reaction).catch(console.error);
}

client.on('message', msg => {
    /* Don't do anything for bots */
    if (msg.author.bot) {
        return;
    }

    let role;

    /* Loop through each role command, see if any apply */
    for (role of config.roles) {
        /* Found a role to apply */
        if (msg.content == config.prefix + role.command) {

            /* Find the role object of the specified role */
            let roleObject = msg.guild.roles.cache.find(val => val.name === role.name);

            /* Couldn't find role */
            if (!roleObject) {
                console.error(`Failed to find role ${role.name} on the server!`);
                return;
            }

            /* Check if they have the role already */
            if (msg.member.roles.cache.some(val => val.name === role.name)) {
                console.error(`User ${msg.member.displayName} already has the role ${role.name}, skipping.`);
                msg.react('👌');
                return;
            }

            /* Apply the role */
            msg.member.roles.add(roleObject).then(() => {
                console.error(`Applied role ${role.name} to ${msg.member.displayName}`);
                msg.react('👌');
            }).catch(console.error);

            break;
        }
    }

    /* Help message */
    if (msg.content == config.prefix + 'help') {
        const help: string = config.prefix + 'help';

        let response: string = '```' + help.padEnd(20) + 'Displays this help message\n';

        for (role of config.roles) {
            const line: string = config.prefix + role.command;

            response += line.padEnd(20) + `Applies the ${role.name} role\n`;
        }

        response += '```';

        msg.reply(response);
    }

});

client.on('error', console.error);

function launch() {
    client.login(config.token)
          .catch((err) => { console.error(err); launch() });
}

launch();
