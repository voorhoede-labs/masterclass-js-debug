#!/usr/bin/env node

const chalk = require('chalk');
const assets = require('../assets');
const assetsTask = require('./assets');
const watcher = require('chokidar').watch(assets);

watcher.on('ready', () => {
  console.log(chalk.green('watching...'))
})
.on('change', () => {
  console.log(chalk.yellow('copying assets...'));
  assetsTask()
});

process.on('exit', console.log.bind(console));
