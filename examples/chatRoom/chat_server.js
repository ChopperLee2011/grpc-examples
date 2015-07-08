'use strict';

import grpc from 'grpc';
const chat_proto = grpc.load(__dirname + '/chat.proto').demo;

const Server = grpc.buildServer([chat_proto.Chat.service]);

/**
 * Get login info
 */
function sayHi(call, cb) {
  console.log(call.request.name + ' login');
  cb(null, {message: 'Hi ' + call.request.name});
}

/**
 * chat service
 */
function chatWith(call) {
  call.on('data', (note)=> {
    console.log(note.message);
    call.write(note);
  });
  call.on('end', ()=>call.end());
}

function getService() {
  return new Server({
    'demo.Chat': {
      sayHi,
      chatWith
    }
  })
}

/**
 * main
 */
function main() {
  let chatServer = getService();
  chatServer.bind('localhost:50051');
  chatServer.listen();
}

main();

