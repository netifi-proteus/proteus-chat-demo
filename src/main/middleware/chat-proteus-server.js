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

export default function(onMessage) {

	return {
		/**
		 * Fire and Forget interaction model of `ReactiveSocket`. The returned
		 * Publisher resolves when the passed `payload` is successfully handled.
		 */

		fireAndForget: onMessage,
		// fireAndForget: function fireAndForget(payload) { //: Payload<D, M>): void,
		// 	console.log('Someone called fireAndForget');
		// 	addMessage('SERVICE: ' + payload.data.toString('utf8') + ' pinged me... but doesn\'t care if I respond', 'fireAndForgetService');
		// },

		/**
		 * Request-Response interaction model of `ReactiveSocket`. The returned
		 * Publisher resolves with the response.
		 */
		requestResponse: function requestResponse(payload) { //: Payload<D, M>): Single<Payload<D, M>>,
			// console.log('Someone called requestResponse');
			// addMessage('SERVICE: ' + payload.data.toString('utf8') + ' pinged me, responding with PONG!', 'requestResponseService');
			// return Single.of({
			// 	data: Buffer.from('PONG! from ' + desintationId),
			// 	metadata: Buffer.alloc(0)
			// });
			return Single.error(new Error('metadataPush() is not implemented'));
		},

		/**
		 * Request-Stream interaction model of `ReactiveSocket`. The returned
		 * Publisher returns values representing the response(s).
		 */
		requestStream: function requestStream(payload) { //: Payload<D, M>): Flowable<Payload<D, M>>,
			return Flowable.error(new Error('requestChannel() is not implemented'));
		},

		/**
		 * Request-Channel interaction model of `ReactiveSocket`. The returned
		 * Publisher returns values representing the response(s).
		 */
		requestChannel: function requestChannel(payloads) { //: Flowable<Payload<D, M>>): Flowable<Payload<D, M>>,
			return Flowable.error(new Error('requestChannel() is not implemented'));
		},

		/**
		 * Metadata-Push interaction model of `ReactiveSocket`. The returned Publisher
		 * resolves when the passed `payload` is successfully handled.
		 */
		metadataPush: function metadataPush(payload) { //: Payload<D, M>): Single<void>,
			return Single.error(new Error('metadataPush() is not implemented'));
		}
	};
};
