
const fs = require('fs');
const path = require('path');

exports.deleteDirectory = deleteDirectory;
exports.clearDirectory = clearDirectory;
exports.createDirectory = createDirectory;
exports.isExists = isExists;

function deleteFile(dir, file) {
    return new Promise(function (resolve, reject) {
        var filePath = path.join(dir, file);
        fs.lstat(filePath, function (err, stats) {
            if (err) {
                return reject(err);
            }
            if (stats.isDirectory()) {
                resolve(deleteDirectory(filePath));
            } else {
                fs.unlink(filePath, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            }
        });
    });
};

function deleteDirectory(dir) {
    return new Promise(function (resolve, reject) {
        fs.access(dir, function (err) {
            if (err) {
                return reject(err);
            }
            fs.readdir(dir, function (err, files) {
                if (err) {
                  return reject(err);
                }
                Promise.all(files.map(function (file) {
                    return deleteFile(dir, file);
                })).then(function () {
                    fs.rmdir(dir, function (err) {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                }).catch(reject);
            });
        });
    });
};

function isExists(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
            return resolve(false);
        }
        return reject(err);
      }
      return resolve(true);
    });
  });
}

function clearDirectory(dir) {
    return new Promise(function (resolve, reject) {
        fs.access(dir, function (err) {
            if (err) {
                return reject(err);
            }
            fs.readdir(dir, function (err, files) {
                if (err) {
                    return reject(err);
                }
                Promise.all(files.map(function (file) {
                    return deleteFile(dir, file);
                })).then(function () {
                    resolve();// do nothing because we don't need remove target directory
                }).catch(reject);
            });
        });
    });
};

function createDirectory(path) {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, (err) => {
          if (err && err.code !== 'EEXIST') {
            return reject(err);
          }
          return resolve();
      });
    })
}
