const Discord = require('discord.js');
const Canvas  = require('canvas');
const tools   = require('../tools');

module.exports = {
	name: 'jpeg',
	aliases: ['jpg', 'needsmorejpeg', 'needsmorejpg'],
	description: "Convert the image to JPEG.",
	usage: '[quality 1-100]',
	async run(message, args, db) {
		// Get the quality from the arguments or use the default.
		const quality = (args.length ? Number(args[0]) : 50);

		// Check if the given quality is valid.
		if (quality > 100 || quality < 0) throw new Error(`Invalid jpeg quality - use 0-100`);

		// Get the image.
		const link = await tools.fetchImage(message);

		// Create a new canvas with the image.
		const image = await Canvas.loadImage(link);
		const canvas = Canvas.createCanvas(image.width, image.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0, image.width, image.height);

		// Send the image in jpeg format.
		const buffer = canvas.toBuffer('image/jpeg', {quality: quality / 100});
		const attachment = new Discord.MessageAttachment(buffer, `convert.jpg`);
		return {files: [attachment]};
	}
}