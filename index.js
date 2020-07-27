// Load the required modules.
const {Client, Collection} = require('discord.js');

const fs        = require('fs');
const config    = require('./config.json');
const tools     = require('./tools');
const {log}     = console;
const client    = new Client();
const db        = new Collection();
const commands  = new Collection();
const cooldowns = new Collection();

// Load the command files from ./commands/
fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
.forEach(file => {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
})

// Attach the command list to the client so commands can use it.
client.commands = commands;

// Message handler, see https://discordjs.guide/command-handling/
client.on('message', async message => {
	// Ignore bot and non-command messages.
	const {prefix} = config;
	const {author} = message;
	if (!message.content.startsWith(prefix)) return;
	if (author.bot) return;

	// Separate the message content into the command and arguments.
	const args = message.content.slice(prefix.length).split(/\s+/);
	const commandName = args.shift().toLowerCase();
	const command = commands.get(commandName)
		|| commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// Exit if no command was found.
	if (!command) return;

	// If the user is on cooldown, exit.
	const {name, usage, cooldown = 3000, minArgs = 0, run} = command;
	const now = Date.now();
	if (!cooldowns.has(name)) cooldowns.set(name, new Collection());
	const timestamps = cooldowns.get(name);
	if (timestamps.has(author.id)) {
		const expirationTime = timestamps.get(author.id) + cooldown;
		if (now < expirationTime) {
			const timeLeft = tools.timer(expirationTime);
			return tools.error(message, `This command is in cooldown for ${timeLeft}`);
		}
	}

	// If an invalid amount of arguments were given, exit.
	if (args.length < minArgs)
		return tools.error(message, `${name} requires at least ${minArgs} args: \`${usage}\``);

	// Run the command.
	// It should return a message or embed to be sent, or false if it failed.
	try {
		const result = await run(message, args, db);
		if (result) {
			message.channel.send(result);
			timestamps.set(author.id, now);
			setTimeout(() => timestamps.delete(author.id), cooldown);
		}
	} catch (error) {
		tools.error(message, `Error while running command: ${error.message}`);
	}
})

// When the bot logs in, set its status.
.on('ready', () => {
	const guildCount = client.guilds.cache.size;
	client.user.setActivity(`for ${config.prefix}help in ${guildCount} guilds`, {type: 'WATCHING'});
	log('ready!');
})

// Log in using the token file.
const token = fs.readFileSync('token.txt').toString();
client.login(token);