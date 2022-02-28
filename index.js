const webSocketsServerPort = 8000;
const webSocketServer = require("websocket").server;
const http = require("http");
const watch = require("node-watch");
const dirTree = require("directory-tree");

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server,
});

// I keep the client connection on this object
var connection = {};
// Recover arguments passed in console
var myArgs = process.argv.slice(2);
// Returns function that updates file structure
var tree = () => dirTree(myArgs[0]);

//This watches for changes on the file structure
watch(myArgs[0], { recursive: true }, function (evt, name) {      ///// if no parameters then error
  connection
    ? connection.send(JSON.stringify(tree()))
    : console.log("connection is not yet established"); //NOTE: Tree might be null.
});

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

// This handles first connection
wsServer.on("request", function (request) {
  var userID = getUniqueID();
  console.log(
    new Date() +
      " Recieved a new connection from origin " +
      request.origin +
      "."
  );
  connection = request.accept(null, request.origin);
  console.log("connected: " + userID);
  console.log(typeof connection);
  connection.send(JSON.stringify(tree()));

  // This closes the conection
  connection.on("close", function (connection) {
    console.log(new Date() + " Peer " + userID + " disconnected.");
    connection = {};
  });
});
