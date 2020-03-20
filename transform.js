var doWork = function(v) {
  const spawn = require('child_process').spawn;
  const ls = spawn('python3', ['./analyze.py']);

  ls.stdout.on('data', (data) => {
    console.log(`${data}`);
  });
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

}

module.exports.doWork = doWork;
