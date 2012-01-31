var sys = require("util"),
	http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs"),
	mime = require("mime");
	
http.createServer(function(request, response) {
	
	var uri = url.parse(request.url).pathname;
	
	var filename = path.join(process.cwd(), uri);
		
	
	path.exists(filename, function(exists){
		
		if (uri == "/") {
			filename = path.join(process.cwd(), "index.html");
		}
	
		console.log("file path: " + filename);	
		
		//console.log("file exists: " + exists);
		
		/*if (!exists) {
		
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.end("404 Not Found \n");
			return;
		}*/
		var mineType = mime.lookup(filename);
		console.log("mine type: " + mineType);	
		
		fs.readFile(filename, "binary", function(err, file) {
		
			if (err) {
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.end(err + "\n");
				return;
			}
			response.setHeader("Content-Type", mineType);
			response.statusCode = 200;
			response.end(file, "binary");
		});
	});
}).listen(80);

console.log("Server running at http://localhost:80/");