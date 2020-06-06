const Canvas = require('canvas');
const config = require('../config.json');
const tools  = require('../tools');

module.exports = {
	name: 'new',
	aliases: ['clear', 'fill', 'newimg', 'newimage', 'newpicture', 'start', 'create', 'createnew'],
	description: "Create a new image with the current color.",
	usage: '[width] [height]',
	async run(message, args, db) {
		// Convert the arguments into numbers.
		args.forEach((arg, index) => args[index] = Number(arg));

		// Separate the arguments into individual variables and assign defaults.
		let [width = 100, height = width] = args;

		// If the safe limit is exceeded, exit.
		if (width > config.safeLimitX) throw new Error(`Maximum image size is ${config.safeLimitX} pixels`);
		if (height > config.safeLimitY) throw new Error(`Maximum image size is ${config.safeLimitY} pixels`);

		// Create a new image and fill it with the background color.
		const canvas = Canvas.createCanvas(width, height);
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = tools.getColor(db, message);
		ctx.rect(0, 0, width, height);
		ctx.fill();

		// Send the image.
		return tools.sendImage(canvas, 'new');
	}
}