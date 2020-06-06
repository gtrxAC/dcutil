const config = require('../config.json');

module.exports = {
	name: 'undo',
	aliases: ['back'],
	description: "Undo a change to the image.",
	async run(message, args, db) {
		// Delete the command message.
		message.delete();

		// Find the previous image and delete it.
		const filter = m => m.author == m.client.user && m.attachments.size && !m.content.includes('dcutil-ignore');
		const messages = await message.channel.messages.fetch(config.undoFetchLimit);
		const lastImage = messages.find(filter);
		if (lastImage) {lastImage.delete()}
		else {throw new Error('No previous image found')};
		return 0;
	}
}