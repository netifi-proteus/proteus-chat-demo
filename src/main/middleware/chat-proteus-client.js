const {
	Proteus,
	BrokerInfoServiceClient,
} = require('proteus-js-client');

const {
	Empty
} = require('proteus-js-core');

const {
	encodeProteusMetadata
} = require('proteus-js-frames');

const {
	ReactiveSocket,
	Encodable
} = require('rsocket-types');

const {
	Flowable,
	Single
} = require('rsocket-flowable');

function createClient(proteusGateway) {

		//Gets a handle to a ReactiveSocket, targeting the group set up in this ProteusGateway config
		const rs = proteusGateway.broadcast(proteusGateway.myGroup());

		return {
			// sendMessage: function sendMessage() {
			// 	const dataBuf = Buffer.from(proteusGateway.myDestination());
			// 	const metadataBuf = encodeProteusMetadata(
			// 		'io.netifi.proteus.demo.ChatService',
			// 		'Message',
			// 		Buffer.alloc(0)
			// 	);
			// 	console.log('Pinging...');
			// 	return rs
			// 		.requestResponse({
			// 			data: dataBuf,
			// 			metadata: metadataBuf,
			// 		})
			// 		.map(payload => {
			// 			console.log('Received payload:' + JSON.stringify(payload));
			// 			if (payload.data == null) {
			// 				throw new Error('data is null');
			// 			}
			// 			return payload.data.toString('utf8');
			// 		});
			// },

			sendMessage: function sendMessage(userMessage) {
				const msg = JSON.stringify(userMessage)
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
