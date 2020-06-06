const Canvas = require('canvas');
const config = require('../config.json');
const tools  = require('../tools');

module.exports = {
	name: 'crop',
	description: "Remove pixels from each side of the image.",
	usage: '<top> [left] [bottom] [right]',
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
		const width = input.width - left - right;
		const height = input.height - top - bottom;
		if (width > config.safeLimitX) throw new Error(`Maximum image size is ${config.safeLimitX} pixels`);
		if (height > config.safeLimitY) throw new Error(`Maximum image size is ${config.safeLimitY} pixels`);

		// Create the cropped image.
		const canvas = Canvas.createCanvas(width, height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(input, 0 - left, 0 - top, input.width, input.height);

		// Send the final image.
		return tools.sendImage(canvas, 'cropped');
	}
}