

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
      if (err) {
          console.log("Command execution error: ", err, stderr);
          return reject(err);
      }
      return resolve(err);
    });
  });

}
