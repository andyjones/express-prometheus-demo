'use strict';

const metrics = require('prom-client'),
      rp      = require('request-promise');

var chuck_summary = new metrics.Summary('http_request_duration_seconds', 'HTTP response duration', ['uri']);

exports.index = (req, res) => {
  var options = {
    uri: 'http://api.icndb.com/jokes/random',
    json: true,
  };

  var timer_end = chuck_summary.startTimer({ 'uri': options.uri});
  rp(options)
    .then(function(joke_body) {
      timer_end();
      res.send(joke_body.value.joke);
    })
    .catch(function(err) {
      timer_end();
      res.send("Got error: " + e.message);
    });
};
