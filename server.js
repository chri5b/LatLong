var http = require("http");
var addresses = require("./addresses");
var restify = require("restify");



function onRequest(request, response) {
  console.log("request recieved");

  response.writeHead(200, {"Content-Type": "text/plain"});
  for(var i = 0; i < addresses.length ; i++) {
	response.write(addresses[i]);
  }
  response.end();

}

http.createServer(onRequest).listen(8888);
console.log("Server has started.");