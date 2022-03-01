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

function handleWatch(){
  myArgs.forEach((arg)=>{
    watch(arg, { recursive: true }, function (evt, name) {      
      connection
        ? connection.send(JSON.stringify(dirTree(arg)))
        : console.log("connection is not yet established");
    })
  })
}

function buildObject(){
  var obj = 
  {name:'',
path:'',
children: []}
  myArgs.forEach((arg)=>{
    obj.children.push(dirTree(arg));
  })
  
  return JSON.stringify(obj)
}

//This watches for changes on the file structure
try{
  handleWatch()
} catch(err){
if(myArgs[0] == null){
console.log('You have to specify a path in the console')
}else{
  console.log("Unfortunately the path you typed doesn't exist")
}

}

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
  connection.send(buildObject())
  // This closes the conection
  connection.on("close", function (connection) {
    console.log(new Date() + " Peer " + userID + " disconnected.");
    connection = {};
  });
});
