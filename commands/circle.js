const Canvas = require('canvas');
const tools  = require('../tools');

module.exports = {
	name: 'circle',
	aliases: ['ellipse', 'drawcircle', 'drawellipse'],
	description: "Draw a circle/ellipse on the image.",
	usage: '<x> <y> <width> [height] [strokeWidth]',
	minArgs: 3,
	async run(message, args, db) {
		// Convert the arguments into numbers.
		args.forEach((arg, index) => args[index] = Number(arg));

		// Separate the arguments into individual variables and assign defaults.
		let [x, y, width, height = width, strokeWidth] = args;

		// Get the image.
		const link = await tools.fetchImage(message);

		// Draw the circle on the image.
		const image = await Canvas.loadImage(link);
		const canvas = Canvas.createCanvas(image.width, image.height);
		const ctx = canvas.getContext('2d');
		const startX = x + (width / 2);
		const startY = y + (height / 2);
		ctx.drawImage(image, 0, 0, image.width, image.height);
		ctx.beginPath();
		ctx.ellipse(startX, startY, width / 2, height / 2, 0, 0, 2 * Math.PI);
		if (strokeWidth) {
			ctx.strokeStyle = tools.getColor(db, message);
			ctx.lineWidth = strokeWidth;
			ctx.stroke();
		} else {
			ctx.fillStyle = tools.getColor(db, message);
			ctx.fill();
		}

		// Send the image.
		return tools.sendImage(canvas, 'circle');
	}
}