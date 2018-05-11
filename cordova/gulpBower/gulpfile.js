
// NodeJs libraries

const path = require('path');

const fileUtils = require('./gulp/utils/file_utils');
const execUtils = require('./gulp/utils/exec_utils');
const Project = require('./gulp/project');
const cordova = require('./gulp/cordova.js');

// Gulp modules
const gulp = require('gulp');
//const exec = require('gulp-exec');
const CWD = path.resolve(path.normalize(process.cwd()));
const PROJECT = new Project({
  name: 'gulpBower',
  groupId: 'jslaboratory.cordova.gulpBower',
  description: 'Gulp + Bower Cordova Project',
  cordova: {
    platforms: [/*'android'*/]
  }
});

console.log("Project", PROJECT);

gulp.task('postinstall', ['_buildDir.create','_cordova.project.create']);

gulp.task('build', function() {
   console.log('Done')
});

gulp.task('_buildDir.create', function (callback) {
    fileUtils.isExists(PROJECT.buildDirectory)
            .then((exists) => !exists ? fileUtils.createDirectory(PROJECT.buildDirectory) : Promise.resolve())
            .then(callback, callback);
});

gulp.task('_cordova.project.create', ['_buildDir.create', '_cordova.project.clean'], function(callback){
  fileUtils.createDirectory(PROJECT.cordova.baseDirectory)
           .then(() => cordova.initProject(PROJECT))
           .then(callback, callback);
});

gulp.task('_cordova.project.clean', function(callback){
  fileUtils.isExists(PROJECT.cordova.baseDirectory)
           .then((exists) => exists ? fileUtils.clearDirectory(PROJECT.cordova.baseDirectory) : Promise.resolve())
           .then(callback, callback);
});
