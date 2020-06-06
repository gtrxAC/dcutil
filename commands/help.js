const config = require('../config.json');
const tools  = require('../tools');

module.exports = {
	name: 'help',
	aliases: ['cmds', 'commands', '?', 'hlp', 'halp', 'hwlp', 'helo'],
	description: "",
	async run(message, args, db) {
		// Format all the commands into a list.
		let str = `**Commands**\n`;
		message.client.commands.forEach(cmd => {
			if (cmd.name != 'help') str += `\n**${cmd.name}**   ${cmd.description}`;
		})

		// Send the list.
		const embed = tools.embed(config.helpEmoji, str);
		return embed;
	}
}