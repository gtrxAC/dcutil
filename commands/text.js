const Canvas = require('canvas');
const config = require('../config.json');
const tools  = require('../tools');

module.exports = {
	name: 'text',
	aliases: ['write'],
	description: "Write text to the image.",
	usage: '<x> <y> <size> [font]',
	minArgs: 3,
	async run(message, args, db) {
		// Extract the metrics from the arguments.
		let [x, y, size, ...font] = args;
		if (font === undefined) font = 'sans-serif';
		font = font.join(' ');
		let text;

		// Interactively ask for the text.
		const embed = tools.embed(config.editEmoji, "What text do you want to write? Type **cancel** to exit.", "This prompt will time out in 30 seconds.");
		message.channel.send(embed);
		const filter = msg => msg.author === message.author;
		const collector = message.channel.createMessageCollector(filter, {time: 30000})
		.on('collect', async msg => {
			text = msg.content;
			collector.stop();
			if (text === 'cancel') throw new Error("Cancelled.");

			// Get the image.
			const link = await tools.fetchImage(message);

			// Draw the text on the image.
			const image = await Canvas.loadImage(link);
			const canvas = Canvas.createCanvas(image.width, image.height);
			const ctx = canvas.getContext('2d');
			ctx.textBaseline = 'top';
			ctx.fillStyle = tools.getColor(db, message);
			ctx.font = `${size}px ${font}`;
			ctx.drawImage(image, 0, 0, image.width, image.height);
			ctx.fillText(text, Number(x), Number(y));

			// Send the final image.
			message.channel.send(tools.sendImage(canvas, 'text'));
		})
	}
}