var server = require("./js/server/server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.socket;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/click"] = requestHandlers.click;
handle["/socket.html"] = requestHandlers.socket;
handle["/game.html"] = requestHandlers.socket;
handle["/Index.html"] = requestHandlers.socket;
//handle["/js/"] = requestHandlers.socket;

server.start(router.route, handle);