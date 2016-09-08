'use strict';

const metrics = require('prom-client');

var hit_counter = new metrics.Counter('http_requests_total', 'Number of page views', ['code', 'method']);

exports.middleware = (req, res, next) => {
  next();
  hit_counter.inc({method: req.method, code: res.statusCode });
};

exports.endpoint = (req, res) => {
  res.end(metrics.register.metrics());
};
