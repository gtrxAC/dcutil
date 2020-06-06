const Canvas = require('canvas');
const config = require('../config.json');
const tools  = require('../tools');

module.exports = {
	name: 'border',
	aliases: ['addborder', 'drawborder'],
	description: "Add a solid color border to the image.",
	usage: '<top> [left] [bottom] [right]',
	cooldown: 4000,
	minArgs: 1,
	async run(message, args, db) {
		// Convert the arguments into numbers.
		args.forEach((arg, index) => args[index] = Number(arg));

		// Separate the arguments into individual variables and assign defaults.
		let [top, left = top, bottom = top, right = left] = args;

		// Get the image.
		const link = await tools.fetchImage(message);

		// Load the image and get its size.
		const input = await Canvas.loadImage(link);
		const width = input.width + left + right;
		const height = input.height + top + bottom;
		if (width > config.safeLimitX) throw new Error(`Maximum image size is ${config.safeLimitX} pixels`);
		if (height > config.safeLimitY) throw new Error(`Maximum image size is ${config.safeLimitY} pixels`);

		// Create a new image, draw the border and the input image on it.
		const canvas = Canvas.createCanvas(width, height);
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = tools.getColor(db, message);
		ctx.fillRect(0, 0, width, top);
		ctx.fillRect(0, 0, left, height);
		ctx.fillRect(width - right, 0, right, height);
		ctx.fillRect(0, height - bottom, width, height);
		ctx.drawImage(input, left, top, input.width, input.height);

		// Send the final image.
		return tools.sendImage(canvas, 'border');
	}
}