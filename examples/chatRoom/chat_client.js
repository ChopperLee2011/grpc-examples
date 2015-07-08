'use strict';

import grpc from 'grpc';
import parseArgs from 'minimist';
const chat_proto = grpc.load(__dirname + '/chat.proto').demo;
const client = new chat_proto.Chat('localhost:50051');
const argv = parseArgs(process.argv.slice(2), {string: 'n'});
const loginUser = argv.n;

function runChat(cb) {
  let call = client.chatWith();
  call.on('data', (note)=> {
    console.log(note.message);
  });
  process.stdin.on('readable', ()=> {
    let chunk = process.stdin.read();
    if (chunk !== null) {
      let note = loginUser + ' say: ' + chunk;
      call.write(note);
    }
  });
}

function main() {
  client.sayHi({name: loginUser}, (err, res)=> console.log(res.message));
  runChat();
}

main();
