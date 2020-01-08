var doWork = function(v) {
  console.log('inside external function');
}

module.exports.doWork = doWork;
