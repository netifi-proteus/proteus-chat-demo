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

const createClient = require('./chat-proteus-client').default;
const createServer = require('./chat-proteus-server').default;

export const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET_MESSAGE';
export const WEBSOCKET_SEND = 'WEBSOCKET_SEND';


class NullSocket {
  send(message){
    console.log(`Warning: send called on NullSocket, dispatch a ${WEBSOCKET_CONNECT} first`);
  }
}

function factory({messageToActionAdapter}) {

	let chatClient;

  return ({dispatch}) => {
    return next => action => {

      switch (action.type) {
        case WEBSOCKET_CONNECT:
        	//HERE IS WHERE THE CLIENT/SERVER interactions go?
					// This Proteus object acts as our gateway to both send messages to services and to register services that we support
					const proteus = Proteus.create({
						setup: {
							group: 'chat-demo',
							accessKey: 9007199254740991,
							accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY='
						},
						transport: {
							url: action.payload.url
						}
					});

					chatClient = createClient(proteus);

					proteus.addService('io.netifi.proteus.demo.ChatService', createServer((payload) => {
							const data = payload.data.toString('utf8');
							console.log("Got a thing! " + data);
							const msg = {data};
							dispatch(messageToActionAdapter(msg) || { type:WEBSOCKET_MESSAGE, payload: msg.data});
						}));

					//Old thing
          // socket = new WebSocket(action.payload.url);
          // socket.onmessage = (msg) => {
          //   dispatch(messageToActionAdapter(msg) || { type:WEBSOCKET_MESSAGE, payload: msg.data});
          // }
          break;
        case WEBSOCKET_SEND:
					console.log("sending a thing! " + action.payload);
					if(chatClient){
						chatClient.sendMessage(action.payload);
					} else {
						console.log("Chat Client is not yet initialized");
					}

          //socket.send(JSON.stringify(action.payload));
          break;
      }
      return next(action);
    };
  };
}
export default factory;

