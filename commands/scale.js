const Canvas = require('canvas');
const tools  = require('../tools');
const config = require('../config.json');

module.exports = {
	name: 'scale',
	aliases: ['resize', 'size'],
	description: "Resize the image.",
	usage: '<width> [height] [noSmoothing]',
	minArgs: 2,
	async run(message, args, db) {
		// Convert the arguments into numbers.
		args.forEach((arg, index) => args[index] = Number(arg));

		// Separate the arguments into individual variables.
		let [width, height = width, noSmoothing] = args;

		// If the safe limit is exceeded, exit.
		if (width > config.safeLimitX) throw new Error(`Maximum image size is ${config.safeLimitX} pixels`);
		if (height > config.safeLimitY) throw new Error(`Maximum image size is ${config.safeLimitY} pixels`);

		// Get the image.
		const link = await tools.fetchImage(message);

		// Create a new image and draw the background color and the input image on it.
		const canvas = Canvas.createCanvas(width, height);
		const ctx = canvas.getContext('2d');
		const input = await Canvas.loadImage(link);
		ctx.fillStyle = tools.getColor(db, message);
		if (noSmoothing) ctx.imageSmoothingEnabled = false;
		ctx.drawImage(input, 0, 0, width, height);

		// Send the final image.
		return tools.sendImage(canvas, 'scaled');
	}
}