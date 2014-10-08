var url = require('url');
var requestHandlers = require("./requestHandlers");

function route(handle, pathname, response, request, counts) {
	console.log("About to route a request for " + pathname);
	var path = url.parse(request.url).pathname;
	var dir = pathname.substring(0, path.lastIndexOf('/'));
	//console.log('requesting file from folder: '+ dir);
	if (typeof handle[pathname] === 'function') {		
		handle[pathname](response, request, counts);		
	} else {
		if ((dir=='/js')||(dir=='/custom'))
		{
			handle[pathname] = requestHandlers.jsStuff;
			handle[pathname](response, request, counts);
		}
		else if(dir=='/art')
		{
			var filetype = pathname.lastIndexOf('.');
			if (filetype == 'png')
			{
				handle[pathname] = requestHandlers.show;
				handle[pathname](response, request, counts);
			}else{			
				handle[pathname] = requestHandlers.jsStuff;
				handle[pathname](response, request, counts);
			}
		}
		else if (dir=='/css') {
			handle[pathname] = requestHandlers.cssStuff;
			handle[pathname](response, request, counts);			
		}
		else if (dir=='/vendor') {
			handle[pathname] = requestHandlers.jsStuff;
			handle[pathname](response, request, counts);
		}
		else{
			console.log("No request handler found for " + pathname);
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not found");
			response.end();
		}
	}
}	
exports.route = route;	