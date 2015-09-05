const {Cc, Ci} = require("chrome");
require("tabs").on("ready", des);
var socketService = Cc['@mozilla.org/network/socket-transport-service;1'].getService(Ci.nsISocketTransportService);

// web server address
var server_ip = "192.168.56.2";
var server_port = 8080;

// snort ip address
var snort_ip = "192.168.56.3";
var snort_port = 8080;

function dec(tab){
	var url = new String(tab.url);
	var url_target = "http://" + server_ip;
	if(url.startsWith(url_target)){
		getQuery(tab);
	}
}

function getQuery(tab){
	var pos = tab.url.search(/\?/);
	if(pos > 0){
		query = tab.url.substr(pos + 1);
		sendQuery(query);
	}
}

function sendQuery(query){
	var transport = socketService.createTransport(null, 0, snort_ip, snort_port, null);
	var stream = transport.openOutputStream(0,0,0);
	console.log(query);
	stream.write(query, query.length);
	stream.flush();
	stream.close();
}
