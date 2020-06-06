const Canvas = require('canvas');
const config = require('../config.json');

module.exports = {
	name: 'paste',
	aliases: ['overlay', 'pasteimage', 'pasteimg'],
	description: "Paste an image over another.",
	usage: '<x> <y> [width] [height] [noSmoothing]',
	cooldown: 4000,
	minArgs: 2,
	async run(message, args, db) {
		// Convert the arguments into numbers.
		args.forEach((arg, index) => args[index] = Number(arg));

		// Separate the arguments into individual variables.
		let [x, y, width, height, noSmoothing] = args;

		// Check if the overlay image is present.
		if (!message.attachments.size) throw new Error(`Please attach an image to be pasted\n[How to Attach Links](https://cdn.discordapp.com/attachments/715446679519887391/717345809175412786/Recording-2020-05-28_22.20.37.mp4)`);
		let bgLink;
		
		// Find the images.
		const messages = await message.channel.messages.fetch({limit: config.imageLoaderFetchLimit});
		const attachmentMsg = messages.find(msg => msg.attachments.size && !msg.content.includes('dcutil-ignore') && msg !== message);
		if (attachmentMsg) {bgLink = attachmentMsg.attachments.first().url}
		else {bgLink = message.author.avatarURL({format: 'png'})};
		const fgLink = message.attachments.first().url;

		// Load the background image.
		const bgImage = await Canvas.loadImage(bgLink);
		const canvas = Canvas.createCanvas(bgImage.width, bgImage.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height);
		
		// Paste the overlay image over it.
		const fgImage = await Canvas.loadImage(fgLink);
		if (width === undefined) width = fgImage.width;
		if (height === undefined) height = fgImage.height;
		if (noSmoothing) ctx.imageSmoothingEnabled = false;
		ctx.drawImage(fgImage, x, y, width, height);

		// Send the image.
		return tools.sendImage(canvas, 'pasted');
	}
}