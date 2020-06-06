const Canvas = require('canvas');
const tools  = require('../tools');

module.exports = {
	name: 'rect',
	aliases: ['rectangle', 'drawrectangle', 'drawrect', 'square', 'drawsquare', 'plot', 'pixel'],
	description: "Draw a rectangle on the image.",
	usage: '<x> <y> [width] [height] [strokeWidth]',
	minArgs: 2,
	async run(message, args, db) {
		// Convert the arguments into numbers.
		args.forEach((arg, index) => args[index] = Number(arg));

		// Separate the arguments into individual variables and assign defaults.
		let [x, y, width = 1, height = 1, strokeWidth] = args;

		// Get the image.
		const link = await tools.fetchImage(message);

		// Draw the rectangle on the image.
		const image = await Canvas.loadImage(link);
		const canvas = Canvas.createCanvas(image.width, image.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0, image.width, image.height);
		if (strokeWidth) {
			ctx.strokeStyle = tools.getColor(db, message);
			ctx.lineWidth = strokeWidth;
			ctx.strokeRect(x, y, width, height);
		} else {
			ctx.fillStyle = tools.getColor(db, message);
			ctx.fillRect(x, y, width, height);
		}

		// Send the image.
		return tools.sendImage(canvas, 'rect');
	}
}