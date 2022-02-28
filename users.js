const express = require('express');
const router = express.Router();
const dirTree = require("directory-tree");
const watch = require('node-watch');



/* GET users listing. */
router.get('/', function(req, res, next) {
 // res.send('respond with a resource');
 var myArgs = process.argv.slice(2);
 watch(myArgs[0], { recursive: true }, function(evt, name) {
  res.send(tree)     //NOTE: Tree might be null.
});
 var tree = dirTree(myArgs[0]);
 res.send(tree)     //NOTE: Tree might be null.
});
module.exports = router;