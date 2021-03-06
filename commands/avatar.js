module.exports = {
	name: 'avatar',
	aliases: ['pfp'],
	description: "Get an image from someone's avatar.",
	usage: '[@user | nickname | username | userid]',
	async run(message, args, db) {
		// Get the user from the arguments, or default to the author.
		const name = args.join(' ');
		const member = (args.length ? message.mentions.members.first()
		|| message.guild.members.cache.find(m => m.displayName.startsWith(name)
		|| m.user.tag.startsWith(name))
		|| message.guild.members.cache.get(args[0])
		|| message.member : message.member);

		// Get their avatar URL.
		const url = member.user.avatarURL({format: 'png', dynamic: true});

		// Send an attachment containing it.
		return {files: [url]};
	}
}