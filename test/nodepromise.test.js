var promise = require('node-promise');

var zookeeper = require('node-zookeeper-client');

var getChildren = function (zkServers, path) {

  var deferred = promise.defer();

  var client = zookeeper.createClient(zkServers);

  client.once('connected', function () {
    console.log('zookeeper connected');
    client.getChildren(path, function (error, children, stats) {
      client.close();
      if (error) {
        console.log('error is', error);
        deferred.reject(error);
      } else {
        console.log('Children are: %j.', children);
        deferred.resolve(children);
      }
    });
  });

  client.connect();

  return deferred.promise;
};


getChildren('127.0.0.1', '/registry');

getChildren('127.0.0.1', '/registry').then(function (children) {
  console.log('my children2 is', children);
});
