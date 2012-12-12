var http = require("http");
var addresses = require("./addresses");
var restify = require("restify");
var assert = require("assert");
var url = require("url");

function onRequest(request, response) {
	console.log("request recieved");
	var thisURL = url.parse(request.url,true);
	var thisAddress = thisURL.pathname;
	var thisQueryString = thisURL.query;
	var from = parseInt(thisQueryString.from);
	var num = parseInt(thisQueryString.num);
	
	if(thisAddress == "/getLatLong") {
		response.writeHead(200, {"Content-Type": "text/plain"});

		var myAddresses = addresses.addresses();
		var waiting = 0;
		var client = restify.createJsonClient({
			url: 'http://maps.googleapis.com',
			version: '*'
		});	
		
		addressSubset = myAddresses.slice(from,from+num);

		for(i in addressSubset) {
			address = addressSubset[i];
			waiting ++;
			var requestAddress = '/maps/api/geocode/json?address=' + address + '&sensor=false';
			client.get(requestAddress, function(err, req, res, obj) {
				if(obj.status == "OK") {
					var geoCodedAddress = {};
					geoCodedAddress.address = obj.results[0].formatted_address;
					geoCodedAddress.lat = obj.results[0].geometry.location.lat;
					geoCodedAddress.lng = obj.results[0].geometry.location.lng;
					
					console.log(geoCodedAddress);
					
					response.write(JSON.stringify(geoCodedAddress,null,2)+',');
				} else {
					console.log(obj.status);
				}
				complete();
			});
		}
		
		function complete() {
			waiting --;	
			if(!waiting) {
				response.end()
			}
		}
	} else {
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.end();
	}
	
}



http.createServer(onRequest).listen(8000);
console.log("Server has started.");