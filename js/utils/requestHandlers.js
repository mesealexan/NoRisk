var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var url = require('url');
var formidable = require("formidable");
var _path = __dirname;
var _counts = 0;

function start(response,request, counts) {
	console.log("Request handler 'start' was called.");
	
	/*
	var body = '<html>'+
				'<head>'+
				'<meta http-equiv="Content-Type" '+
				'content="text/html; charset=UTF-8" />'+
				'</head>'+
				'<body>'+
					'<form action="/upload" enctype="multipart/form-data" '+
					'method="post">'+
						'<input type="file" name="upload">'+
						'<input type="submit" value="Upload file" />'+
					'</form>'+
				'</body>'+
				'</html>';
	*/
	
	var body = '<html>'+
				'<head>'+
				'<meta http-equiv="Content-Type" '+
				'content="text/html; charset=UTF-8" />'+
				'</head>'+
				'<body>'+
					'<div>'+
					'<form action="/click">' +
						'<input type="text" name="userLog" value="User name">' +
					'<input type="submit" value="Log in">' +
				'</body>'+
				'</html>';
		
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
	/*
	function sleep(milliSeconds) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds);
	}
	sleep(10000);
	return "Hello Start";
	*/
}

function click(response,request, counts)
{
	counts++;
	_counts++;
	console.log('Increasing counts to: '+counts+' , _counts: '+_counts);
	var body = '<html>'+
				'<head>'+
				'<meta http-equiv="Content-Type" '+
				'content="text/html; charset=UTF-8" />'+
				'</head>'+
				'<body>'+
					'<div>' +
						'Connected and in lobby with: '+
					+'</div>'
				'</body>'+
				'</html>';
		
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
	
}
	

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		/* Possible error on Windows systems:
		tried to rename to an already existing file */
		response.writeHead(200, {"Content-Type": "text/html"});
		fs.rename(files.upload.path, _path + "/tmp/tmp.png", function(err) {
			if (err) {
				fs.unlink(_path + "/tmp/tmp.png");
				fs.rename(files.upload.path, _path + "/tmp/tmp.png", function (err) {
					if (err) console.log('error renaming file: '+err);
				});
			}
		});		
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function socket(response, request){
	var path = url.parse(request.url).pathname;
	console.log('attempting to open: '+__dirname+'\n Path: '+path);
	fs.readFile(__dirname + path, function(error, data){
        if (error){
			response.writeHead(404);
            response.write("opps this doesn't exist - 404");
			response.end();
        }
        else{
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data, "utf8");
			response.end();
         }
    });
	
}

function socketIndex(response, request){
	var path = url.parse(request.url).pathname;
	console.log('attempting to open: '+__dirname+'\n Path: '+path);
	fs.readFile(path, function(error, data){
        if (error){
			response.writeHead(404);
            response.write("opps this doesn't exist - 404");
			response.end();
        }
        else{
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data, "utf8");
			response.end();
         }
    });
	
}

function jsStuff(response, request){
	var path = url.parse(request.url).pathname;
	fs.readFile(__dirname + path, function(error, data){
        if (error){
			response.writeHead(404);
            response.write("opps this doesn't exist - 404");
			response.end();
        }
        else{
            response.writeHead(200, {"Content-Type": "application/javascript"});
            response.write(data, "utf8");
			response.end();
         }
    });
	
}

function cssStuff(response, request){
	var path = url.parse(request.url).pathname;
	fs.readFile(__dirname + path, function(error, data){
        if (error){
			response.writeHead(404);
            response.write("opps this doesn't exist - 404");
			response.end();
        }
        else{
            response.writeHead(200, {"Content-Type": "text/css"});
            response.write(data, "utf8");
			response.end();
         }
    });	
}


function show(response) {
	console.log("Request handler 'show' was called.");
	fs.readFile(__dirname + path, "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + " aruncata de FS \n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.cssStuff = cssStuff;
exports.jsStuff = jsStuff;
exports.click = click;
exports.start = start;
exports.upload = upload;
exports.show = show;
exports.socket = socket;
exports.socketIndex = socketIndex;