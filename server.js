var sys = require("util"),
	http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs"),
	mime = require("mime");
    
var port = process.env.C9_PORT;
port = port === undefined ? "80" : port;

http.createServer(function(request, response) {
	
	var uri = url.parse(request.url).pathname;
	
	var filename = path.join(process.cwd(), uri);
		
	filename = uri == "/" ? path.join(process.cwd(), "index.html") : filename;
	
	path.exists(filename, function(exists){
	
		var mimeType = mime.lookup(filename);
        
		console.log("file path: " + filename + ", mime type: " + mimeType);
        
		if (!exists) {
		
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.end("404 Not Found \n");
			return;
		}
		
		fs.readFile(filename, "binary", function(err, file) {
		
			if (err) {
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.end(err + "\n");
				return;
			}
			response.writeHead(200, {"Content-Type": mimeType}); //response.writeHead(200);
			
			response.end(file, "binary");
		});
	});
}).listen(port);

console.log("Server running at http://localhost:" + port + "/");