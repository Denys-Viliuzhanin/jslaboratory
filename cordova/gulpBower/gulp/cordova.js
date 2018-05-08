


const execUtils = require('./utils/exec_utils');
const path = require('path');

exports.newProject = newProject;

function newProject(project) {
  return execUtils.executeCommand([
    'node',
    path.join(project.nodeModulesDirectory, 'cordova/bin/cordova'),
    'create',
    project.name,
    project.groupId,
    ['"', project.description, '"'].join('')
   ], {
     cwd:project.cordovaProjectDirectory
   })
}
