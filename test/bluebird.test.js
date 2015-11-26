var Promise = require('bluebird');

var zookeeper = require('node-zookeeper-client');

var getChildren = function (zkServers, path) {
  return new Promise(function (resolve, reject) {
    var client = zookeeper.createClient(zkServers);

    client.once('connected', function () {
      console.log('zookeeper connected');
      client.getChildren(path, function (error, children, stats) {
        client.close();
        if (error) {
          console.log('error is', error);
          reject(error);
          return;
        } else {
          console.log('Children are: %j.', children);
          resolve(children);
          return;
        }
      });
    });

    client.connect();

  });
};


getChildren('127.0.0.1','/registry');

getChildren('127.0.0.1','/registry').then(function (children) {
  console.log('my children2 is', children);
});
