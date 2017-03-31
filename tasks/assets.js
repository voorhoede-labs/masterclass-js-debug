'use strict';

const chalk = require('chalk');
const mkdirp = require('mkdirp');
const ncp = require('ncp').ncp;
const path = require('path');

const dist = './dist';
const assets = require('../assets');

const copyAssets = () => {
  mkdirp(dist, err => {
    if (err) {
      console.error('failed to create ./dist in %s', __dirname);
      process.exit(1);
    }
    assets.forEach(function (file) {
        const filename = path.basename(file);
        ncp(file, path.join(dist, filename), err => {
          if (err) {
              console.error('failed to copy %s to %s', file, dist);
              process.exit(1);
          }
        });
    });
  });
}
module.exports = copyAssets;

if(require.main === module){
  copyAssets();
}
