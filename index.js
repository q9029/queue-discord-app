const { exec } = require('child_process');

exec('ls -l', (err, stdout, stderr) => {
    if (err) {
      console.log(`stderr: ${stderr}`);
      return
    }
    console.log(`stdout: ${stdout}`);
  }
)
console.log('わくわくBank');

const https = require('https');
while (true) {
  https.get('https://queue-discord-app.herokuapp.com/', function(res) {
    console.log("Get!");
  });
  const d1 = new Date();
  while (true) {
    const d2 = new Date();
    if (d2 - d1 > 60) {
      break;
    }
  }
}
