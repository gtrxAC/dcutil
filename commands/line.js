const Canvas = require('canvas');
const tools  = require('../tools');

module.exports = {
	name: 'line',
	aliases: ['drawline'],
	description: "Draw a line from A to B on the image.",
	usage: '<ax> <ay> <bx> <by> [strokeWidth]',
	minArgs: 4,
	async run(message, args, db) {
		// Convert the arguments into numbers.
		args.forEach((arg, index) => args[index] = Number(arg));

		// Separate the arguments into individual variables and assign defaults.
		let [ax, ay, bx, by, strokeWidth = 1] = args;

		// Get the image.
		const link = await tools.fetchImage(message);

		// Draw the line on the image.
		const image = await Canvas.loadImage(link);
		const canvas = Canvas.createCanvas(image.width, image.height);
		const ctx = canvas.getContext('2d');
		ctx.strokeStyle = tools.getColor(db, message);
		ctx.lineWidth = strokeWidth;
		ctx.drawImage(image, 0, 0, image.width, image.height);
		ctx.beginPath();
		ctx.moveTo(ax, ay);
		ctx.lineTo(bx, by);
		ctx.stroke();

		// Send the image.
		return tools.sendImage(canvas, 'line');
	}
}