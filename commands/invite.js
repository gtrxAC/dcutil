const config = require('../config.json');
const tools  = require('../tools');

module.exports = {
	name: 'invite',
	aliases: ['getbot', 'addbot'],
	description: "Invite the bot to your server.",
	async run(message, args, db) {
		const link = `https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&scope=bot&permissions=52224`;
		return tools.embed(config.linkEmoji, `Add ${message.client.user.username} to your guild [here](${link})`);
	}
}