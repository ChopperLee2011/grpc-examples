'use strict'

var PROTO_PATH = __dirname + '/helloWorld.proto';
var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;

function main() {
  var client = new hello_proto.Greeter('localhost:50051');
  client.sayHello({name: ''}, function (err, response) {
    console.log('Greeting:', response.message);
  });
}

main();