'use strict';

const express   = require('express'),
      indexCtrl = require('./controllers/index'),
      promHttp  = require('./middleware/prom-http');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(promHttp.middleware);

app.get('/',        indexCtrl.index);
app.get('/metrics', promHttp.endpoint);

app.listen(app.get('port'), () => {
    console.log('Listening on http://localhost:%s', app.get('port'));
});

module.exports = app;
