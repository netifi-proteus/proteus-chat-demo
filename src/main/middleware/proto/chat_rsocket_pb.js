// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_rpc_metrics = require('rsocket-rpc-metrics').Metrics;
var rsocket_flowable = require('rsocket-flowable');
var chat_pb = require('./chat_pb.js');

var ChatClient = function () {
  function ChatClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.chatTrace = rsocket_rpc_tracing.traceSingle(tracer, "Chat", {"rsocket.rpc.service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "chat"}, {"rsocket.rpc.role": "client"});
    this.chatMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "Chat", {"service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "chat"}, {"role": "client"});
    this.joinTrace = rsocket_rpc_tracing.traceSingle(tracer, "Chat", {"rsocket.rpc.service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "join"}, {"rsocket.rpc.role": "client"});
    this.joinMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "Chat", {"service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "join"}, {"role": "client"});
  }
  ChatClient.prototype.chat = function chat(message, metadata) {
    const map = {};
    this.chatMetrics(new rsocket_flowable.Single(subscriber => {
      this.chatTrace(map)(new rsocket_flowable.Single(innerSub => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.demo.chat.Chat', 'Chat', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.fireAndForget({
          data: dataBuf,
          metadata: metadataBuf
        });
        innerSub.onSubscribe();
        innerSub.onComplete();
      })).subscribe({ onSubscribe: function onSubscribe() {subscriber.onSubscribe();}, onComplete: function onComplete() {subscriber.onComplete();} });
    })).subscribe({ onSubscribe: function onSubscribe() {}, onComplete: function onComplete() {} });
  };
  ChatClient.prototype.join = function join(message, metadata) {
    const map = {};
    this.joinMetrics(new rsocket_flowable.Single(subscriber => {
      this.joinTrace(map)(new rsocket_flowable.Single(innerSub => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.demo.chat.Chat', 'Join', tracingMetadata, metadata || Buffer.alloc(0));
        this._rs.fireAndForget({
          data: dataBuf,
          metadata: metadataBuf
        });
        innerSub.onSubscribe();
        innerSub.onComplete();
      })).subscribe({ onSubscribe: function onSubscribe() {subscriber.onSubscribe();}, onComplete: function onComplete() {subscriber.onComplete();} });
    })).subscribe({ onSubscribe: function onSubscribe() {}, onComplete: function onComplete() {} });
  };
  return ChatClient;
}();

exports.ChatClient = ChatClient;

var ChatServer = function () {
  function ChatServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.chatTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "Chat", {"rsocket.rpc.service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "chat"}, {"rsocket.rpc.role": "server"});
    this.chatMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "Chat", {"service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "chat"}, {"role": "server"});
    this.joinTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "Chat", {"rsocket.rpc.service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "join"}, {"rsocket.rpc.role": "server"});
    this.joinMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "Chat", {"service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "join"}, {"role": "server"});
    this._channelSwitch = (payload, restOfMessages) => {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      let deserializedMessages;
      switch(method){
        default:
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    };
  }
  ChatServer.prototype.fireAndForget = function fireAndForget(payload) {
    if (payload.metadata == null) {
      throw new Error('metadata is empty');
    }
    var method = rsocket_rpc_frames.getMethod(payload.metadata);
    var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
    switch (method) {
      case 'Chat':
        this.chatMetrics(new rsocket_flowable.Single(subscriber => {
          this.chatTrace(spanContext)(new rsocket_flowable.Single(innerSub => {
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            this._service.chat(chat_pb.ChatEvent.deserializeBinary(binary), payload.metadata);
            innerSub.onSubscribe();
            innerSub.onComplete();
          }).subscribe({ onSubscribe: function onSubscribe() {subscriber.onSubscribe();}, onComplete: function onComplete() {subscriber.onComplete();} }));
        })).subscribe({ onSubscribe: function onSubscribe() {}, onComplete: function onComplete() {} });
        break;
      case 'Join':
        this.joinMetrics(new rsocket_flowable.Single(subscriber => {
          this.joinTrace(spanContext)(new rsocket_flowable.Single(innerSub => {
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            this._service.join(chat_pb.JoinEvent.deserializeBinary(binary), payload.metadata);
            innerSub.onSubscribe();
            innerSub.onComplete();
          }).subscribe({ onSubscribe: function onSubscribe() {subscriber.onSubscribe();}, onComplete: function onComplete() {subscriber.onComplete();} }));
        })).subscribe({ onSubscribe: function onSubscribe() {}, onComplete: function onComplete() {} });
        break;
      default:
        throw new Error('unknown method');
    }
  };
  ChatServer.prototype.requestResponse = function requestResponse(payload) {
    return rsocket_flowable.Single.error(new Error('requestResponse() is not implemented'));
  };
  ChatServer.prototype.requestStream = function requestStream(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestStream() is not implemented'));
  };
  ChatServer.prototype.requestChannel = function requestChannel(payloads) {
    let once = false;
    return new rsocket_flowable.Flowable(subscriber => {
      const payloadProxy = new rsocket_rpc_core.QueuingFlowableProcessor();
      payloads.subscribe({
        onNext: payload => {
          if(!once){
            once = true;
            try{
              let result = this._channelSwitch(payload, payloadProxy);
              result.subscribe(subscriber);
            } catch (error){
              subscriber.onError(error);
            }
          }
          payloadProxy.onNext(payload.data);
        },
        onError: error => {
          payloadProxy.onError(error);
        },
        onComplete: () => {
          payloadProxy.onComplete();
        },
        onSubscribe: subscription => {
          payloadProxy.onSubscribe(subscription);
        }
      });
    });
  };
  ChatServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return ChatServer;
}();

exports.ChatServer = ChatServer;

