'use strict';

const compression = require('compression');
const express = require('express');
const fs = require('fs');
const host = require('../../../clientConfig').host;
const path = require('path');
const port = require('../../../clientConfig').port;
const webpack = require('webpack');
const devConfig = require('../../../webpack.development.config');
const staticResourcesConfig = require('../../../webpack.resources.config');

const app = express();


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

let componentsRoot = path.resolve(__dirname, '../../../src/client/components');
require('@opuscapita/react-showroom-server').makeLocalScan(componentsRoot);

let serverOptions = {
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

app.use(compression());
app.use(require('webpack-dev-middleware')(webpack(devConfig), serverOptions));
app.use(require('webpack-dev-middleware')(webpack(staticResourcesConfig), {
  ...serverOptions,
  publicPath: '/static/components/',
}));

app.get('/', function(req, res) {
  res.sendFile(path.normalize(__dirname + '/index.html'));
});

app.use('/static', express.static(path.resolve(__dirname, './static')));

app.use(require('./proxy'));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});
