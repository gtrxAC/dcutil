const Discord = require('discord.js');
const Canvas  = require('canvas');
const config  = require('./config.json');

module.exports = {
	// Create a simple embed message.
	embed(emoji, text, footer, color) {
		if (!emoji) emoji = config.successEmoji;
		if (emoji == config.editEmoji) color = config.embedEditColor;
		if (emoji == config.successEmoji) color = config.embedSuccessColor;
		return new Discord.MessageEmbed()
		.setColor(color || config.embedDefaultColor)
		.setDescription(`${emoji}  ${text}`)
		.setFooter(`${footer || new Date().toISOString()}`);
	},

	// Create and send an error message.
	error(message, error, footer) {
		const embed = this.embed(config.errorEmoji, error, new Date().toISOString())
		.setColor(config.embedFailColor);
		if (footer) embed.setFooter(footer);
		message.channel.send(embed);
		return false;
	},
	
	// Output a human readable timer until the specified unix timestamp.
	timer(timestamp) {
		const timeLeft = timestamp - Date.now();
		const days = Math.floor(timeLeft / 86400000);
		const hours = Math.floor(timeLeft / 3600000) - (days * 24);
		const minutes = Math.floor(timeLeft / 60000) - (days * 1440) - (hours * 60);
		const seconds = Math.floor(timeLeft / 1000) - (days * 86400) - (hours * 3600) - (minutes * 60);
		string = '';
		if (days) string = string + `${days}d `;
		if (hours) string = string + `${hours}h `;
		if (minutes) string = string + `${minutes}min `;
		if (seconds) string = string + `${seconds}sec`;
		if (!string.length) string = `${timeLeft}ms`;
		return string;
	},

	// Fetch an image link from 1. command message attachment, 2. 10 previous messages, 3. command sender's avatar
	async fetchImage(message) {
		if (message.attachments.size) {
			return message.attachments.first().url;
		} else {
			const messages = await message.channel.messages.fetch({limit: config.imageLoaderFetchLimit});
			const attachmentMsg = messages.find(msg => msg.attachments.size && !msg.content.includes('dcutil-ignore'));
			if (attachmentMsg) {
				return attachmentMsg.attachments.first().url;
			} else {
				throw new Error(`No image attachment found\n[How to Attach Links](https://cdn.discordapp.com/attachments/715446679519887391/717345809175412786/Recording-2020-05-28_22.20.37.mp4)`);
			}
		}
	},

	// Open an image to be edited.
	async openImage(link) {
		const image = await Canvas.loadImage(link);
		const canvas = Canvas.createCanvas(image.width, image.height);
		return canvas.getContext('2d');
	},

	// Return an attachment of the specified canvas.
	sendImage(canvas, name) {
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${name || 'output'}.png`);
		return {files: [attachment]};
	},

	// Get the message author's current color.
	getColor(db, message) {
		return db.get(`u${message.author.id}color`) || 'black';
	}
}