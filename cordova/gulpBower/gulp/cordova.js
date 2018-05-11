


const execUtils = require('./utils/exec_utils');
const fileUtils = require('./utils/file_utils');
const path = require('path');

exports.initProject = initProject;

function initProject(project) {
  return newProject(project)
         .then(clearDefaultFile)
         .then(addPlatforms)
         .then(() => {});
}

function newProject(project) {
  return runCordovaCliInBaseDirectory(project.cordova, [
    'create',
    project.name,
    project.groupId,
    ['"', project.description, '"'].join('')
  ])
   .then(() => project);
}

function clearDefaultFile(project) {
  return Promise.all([
    fileUtils.isExists(project.cordova.wwwDirectory)
             .then((exists) => exists ? fileUtils.clearDirectory(project.cordova.wwwDirectory) : Promise.resolve())
           ])
             .then(() => project);
}

function addPlatforms(project) {
  return runCordovaCliInProjectDirectory(project.cordova, [
    'platform',
    'add',
     project.cordova.platforms.join(' ')
  ]).then(() => project);
}

function runCordovaCliInProjectDirectory(cordova, cordovaArguments) {
  return runCordovaCli(cordova, cordovaArguments, cordova.projectDirectory);
}

function runCordovaCliInBaseDirectory(cordova, cordovaArguments) {
  return runCordovaCli(cordova, cordovaArguments, cordova.baseDirectory);
}

function runCordovaCli(cordova, cordovaArguments, workingDirectory) {
  const args = cordovaArguments.join(' ');
  console.log('cordova', args);
  return execUtils.executeCommand([
    ['"', process.execPath, '"'].join(''),
    ['"', cordova.cliPath, '"'].join(''),
    args
   ], {
     cwd: workingDirectory
   })
}
