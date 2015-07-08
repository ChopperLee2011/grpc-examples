'use strict'

var PROTO_PATH = __dirname + '/helloworld.proto';
var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;

var Server = grpc.buildServer([hello_proto.Greeter.service]);

function sayHello(call, callback) {
  callback(null, {message: 'Hello world'});
}

function main() {
  var server = new Server({
    "helloworld.Greeter": {
      sayHello: sayHello
    }
  });

  server.bind('0.0.0.0:50051');
  server.listen();
}

main();