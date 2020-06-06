const tools = require('../tools');

module.exports = {
	name: 'color',
	aliases: ['colour', 'setcolor', 'changecolor', 'setcolour', 'changecolour'],
	description: "View or change your current color.",
	usage: '[csscolor]',
	cooldown: 2000,
	async run(message, args, db) {
		if (args.length) {
			db.set(`u${message.author.id}color`, args.join(' '));
			return tools.embed(0, `Set your current color to ${args.join(' ')}`);
		} else {
			const current = tools.getColor(db, message);
			return tools.embed(0, `Your current color is ${current}`);
		}
	}
}