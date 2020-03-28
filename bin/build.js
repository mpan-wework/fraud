const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
const configureWebpack = require('./configureWebpack');

let webpackConfig = defaults.__get__('config');
configureWebpack(webpackConfig);
