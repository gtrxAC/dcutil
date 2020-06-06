const Discord = require('discord.js');
const Canvas  = require('canvas');
const tools   = require('../tools');

module.exports = {
	name: 'metrics',
	aliases: ['rulers', 'info', 'imageinfo'],
	description: "Show image metrics.",
	usage: '[rulerPrecision]',
	cooldown: 5000,
	async run(message, args, db) {
		// Get the ruler precision from the arguments or use the default value.
		args[0] = Number(args[0]);
		const [rulerPrecision = 50] = args;

		// Get the image.
		const link = await tools.fetchImage(message);

		// Load the image.
		const image = await Canvas.loadImage(link);
		const {width, height} = image;
		const canvas = Canvas.createCanvas(width, height);
		const ctx = canvas.getContext('2d');
		const horzMiddle = Math.floor(width / 2);
		const vertMiddle = Math.floor(height / 2);
		ctx.drawImage(image, 0, 0, width, height);

		// Set the drawing parameters.
		ctx.font = 'bold 14px sans-serif';
		ctx.fillStyle = tools.getColor(db, message);
		ctx.strokeStyle = tools.getColor(db, message);
		ctx.shadowColor = 'black';
		ctx.shadowOffsetX = 1;
		ctx.shadowOffsetY = 1;
		
		// Draw a dot and coordinates in the middle.
		ctx.fillRect(horzMiddle, vertMiddle, 2, 2);
		ctx.fillText(`x: ${horzMiddle}  y: ${vertMiddle}`, horzMiddle + 3, vertMiddle + 12, horzMiddle - 4);
		
		// Draw rulers at the top and left side.
		for (let y = rulerPrecision; y < height; y += rulerPrecision) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(10, y);
			ctx.stroke();
			ctx.fillText(y, 12, y, 50);
		}
		for (let x = rulerPrecision; x < width; x += rulerPrecision) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, 10);
			ctx.stroke();
			ctx.fillText(x, x, 24, 30);
		}

		// Send the final image.
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'metrics.png');
		message.channel.send(`dcutil-ignore\nTotal size: **${width} × ${height}**`, {files: [attachment]});
	}
}