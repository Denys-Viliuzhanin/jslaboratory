

const exec = require('child_process').exec;

exports.executeCommand = executeCommand;

function executeCommand(command, options) {
  return new Promise((resolve, reject) => {
    const commandString = command.join(' ');
    console.log("Running command: ", commandString);
    exec(commandString, options, function(err, stdout, stderr){
      if (stdout) {
          console.log(stdout);
      }
      if (stderr) {
          console.log("Command execution error: ", stderr);
          return reject(err);
      }
      return resolve(err);
    });
  });

}
