


const path = require('path');

module.exports = Project;

const CWD = path.resolve(path.normalize(process.cwd()));

function Project(options) {
  this.name = options.name;
  this.groupId = options.groupId;
  this.description = options.description;
  this.buildDirectory = path.join(CWD, 'build');
  this.nodeModulesDirectory = path.join(CWD, 'node_modules');

  // will be deprecated

  var cordovaOptions = options.cordova || {};

  var cordova = this.cordova = {}
  cordova.cliPath = path.join(this.nodeModulesDirectory, 'cordova/bin/cordova');
  cordova.baseDirectory = path.join(CWD, 'build/cordova-project');
  cordova.projectDirectory = path.join(cordova.baseDirectory, this.name);
  cordova.wwwDirectory = path.join(cordova.projectDirectory, 'www');
  cordova.cssDirectory = path.join(cordova.wwwDirectory, 'css');
  cordova.jsDirectory = path.join(cordova.wwwDirectory, 'js');
  cordova.imgDirectory = path.join(cordova.wwwDirectory, 'images');

  cordova.platforms = cordovaOptions.platforms || [];
  if (!cordova.platforms.includes('browser')) {
    cordova.platforms.push('browser');
  }
}
