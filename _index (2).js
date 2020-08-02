const { exec } = require('child_process');

console.log('indes.js thread');

exec('node thread.js', (err, stdout, stderr) => {
    console.log("call thread.js");
  }
);

while (true) {
  console.log("Loop!");
  const d1 = new Date();
  while (true) {
    const d2 = new Date();
    if (d2 - d1 > 1000) {
      break;
    }
  }
}
