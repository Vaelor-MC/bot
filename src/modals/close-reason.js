const { Modal } = require('@eartharoid/dbf');
const ExtendedEmbedBuilder = require('../lib/embed');

module.exports = class CloseReasonModal extends Modal {
	constructor(client, options) {
		super(client, {
			...options,
			id: 'closeReason',
		});
	}

	/**
	 * @param {*} id
	 * @param {import("discord.js").ModalSubmitInteraction} interaction
	 */
	async run(id, interaction) {
		/** @type {import("client")} */
		const client = this.client;

		await interaction.deferReply();

		const reason = interaction.fields.getTextInputValue('reason');

		client.tickets.$stale.set(interaction.channel.id, {
			...client.tickets.$stale.get(interaction.channel.id),
			reason: reason?.length > 0 ? reason : null,
		});

		if (id.next === 'acceptClose') {
			await client.tickets.acceptClose(interaction);
		}
	}
};
