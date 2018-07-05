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

		/** NOT USED IN THIS EXAMPLE
		 * Request-Response interaction model of `ReactiveSocket`. The returned
		 * Publisher resolves with the response.
		 */
		requestResponse: function requestResponse(payload) {
			return Single.error(new Error('metadataPush() is not implemented'));
		},

		/** NOT USED IN THIS EXAMPLE
		 * Request-Stream interaction model of `ReactiveSocket`. The returned
		 * Publisher returns values representing the response(s).
		 */
		requestStream: function requestStream(payload) {
			return Flowable.error(new Error('requestChannel() is not implemented'));
		},

		/** NOT USED IN THIS EXAMPLE
		 * Request-Channel interaction model of `ReactiveSocket`. The returned
		 * Publisher returns values representing the response(s).
		 */
		requestChannel: function requestChannel(payloads) {
			return Flowable.error(new Error('requestChannel() is not implemented'));
		},

		/** NOT USED IN THIS EXAMPLE
		 * Metadata-Push interaction model of `ReactiveSocket`. The returned Publisher
		 * resolves when the passed `payload` is successfully handled.
		 */
		metadataPush: function metadataPush(payload) {
			return Single.error(new Error('metadataPush() is not implemented'));
		}
	};
};
