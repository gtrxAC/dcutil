module.exports = {
	name: 'avatar',
	aliases: ['pfp'],
	description: "Get an image from someone's avatar.",
	usage: '[@user | userid | username]',
	async run(message, args, db) {
		// Get the user from the arguments, or default to the author.
		const name = args.join(' ');
		const member = message.mentions.members.first()
		|| message.guild.members.cache.find(m => m.displayName.startsWith(name))
		|| message.guild.members.cache.get(args[0])
		|| message.member;

		// Get their avatar URL.
		const url = member.user.avatarURL({format: 'png'});

		// Send an attachment containing it.
		return {files: [url]};
	}
}