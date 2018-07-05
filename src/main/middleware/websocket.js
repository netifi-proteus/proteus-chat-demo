const {
	Proteus,
} = require('proteus-js-client');

const createClient = require('./chat-proteus-client').default;
const createServer = require('./chat-proteus-server').default;

export const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET_MESSAGE';
export const WEBSOCKET_SEND = 'WEBSOCKET_SEND';


/** Default WEBSOCKET value, no longer used
class NullSocket {
  send(message){
    console.log(`Warning: send called on NullSocket, dispatch a ${WEBSOCKET_CONNECT} first`);
  }
}
*/

function factory({messageToActionAdapter}) {

	/** WEBSOCKET create the socket in a scope such that it's able to be used in both cases below
	let socket = new NullSocket();
	*/
	//Same deal with our chat client
	let chatClient;

  return ({dispatch}) => {
    return next => action => {

      switch (action.type) {
        case WEBSOCKET_CONNECT:
					/** New Protues client way */
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

					//We create our Proteus client in order to broadcast to our peers
					chatClient = createClient(proteus);

					//Register our implementation of the Proteus service that reacts to incomming messages from our peers
					proteus.addService('io.netifi.proteus.demo.ChatService', createServer((payload) => {
							const data = payload.data.toString('utf8');
							console.log("Got a thing! " + data);
							const msg = {data};
							dispatch(messageToActionAdapter(msg) || { type:WEBSOCKET_MESSAGE, payload: msg.data});
						}));

					/** WEBSOCKET connection setup
           socket = new WebSocket(action.payload.url);
           socket.onmessage = (msg) => {
             dispatch(messageToActionAdapter(msg) || { type:WEBSOCKET_MESSAGE, payload: msg.data});
           }
					 */

          break;
        case WEBSOCKET_SEND:
        	/** New Protues client way */
					console.log("sending a thing! " + action.payload);
					if(chatClient){
						chatClient.sendMessage(action.payload);
					} else {
						console.log("Chat Client is not yet initialized");
					}

					/** WEBSOCKET message send
          socket.send(JSON.stringify(action.payload));
					 */

          break;
      }
      return next(action);
    };
  };
}
export default factory;

