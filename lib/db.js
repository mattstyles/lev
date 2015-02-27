/*
 *
 * db.js
 * create in instance of levelup.
 *
 */
var level = require('level');
var multilevel = require('multilevel');
var net = require('net');
var fs = require('fs');

module.exports = function(args) {

  if (args.r) {
    var manifest = args.manifest
        ? JSON.parse( fs.readFileSync( args.manifest ) )
        : null;
    var client = multilevel.client(manifest);
    var db = args.sublevel
        ? client.sublevel( args.sublevel )
        : client;
    var con = net.connect(args.port);
    con.pipe(client.createRpcStream()).pipe(con);
    return db;
  }

  return level(args.path, args);
};
