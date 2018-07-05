const {
	encodeProteusMetadata
} = require('proteus-js-frames');

function createClient(proteusGateway) {

		//Gets a handle to a ReactiveSocket, targeting the group set up in this ProteusGateway config, and broadcasts to it
		const rs = proteusGateway.broadcast(proteusGateway.myGroup());

		return {

			sendMessage: function sendMessage(userMessage) {
				const msg = JSON.stringify(userMessage);
				console.log("Attempting to send:" + msg);
				const dataBuf = Buffer.from(msg);
				const metadataBuf = encodeProteusMetadata(
					'io.netifi.proteus.demo.ChatService',
					'Message',
					Buffer.alloc(0)
				);
				return rs
					.fireAndForget({
						data: dataBuf,
						metadata: metadataBuf,
					});
			}
		};
}

export default createClient;
