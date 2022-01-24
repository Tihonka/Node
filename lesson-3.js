const fs = require('fs');
const readline = require('readline');
const ACCESS_LOG = './access.log';

const IP1 = '89.123.1.41';
const IP2 = '34.48.240.111';

const readStream = fs.createReadStream(ACCESS_LOG, {
    flags: 'r',
    encoding: 'utf-8',
});

const writeStream1 = fs.createWriteStream('./89.123.1.41_requests.log', {
    encoding: 'utf-8',
    flags: 'a',
});

const writeStream2 = fs.createWriteStream('./34.48.240.111_requests.log', {
    encoding: 'utf-8',
    flags: 'a',
});

const rl = readline.createInterface({ input: readStream});

rl.on('line', (line) =>{
  if(line.includes(IP1)){
      writeStream1.write(line + '\n');
  };

  if(line.includes(IP2)){
    writeStream2.write(line + '\n');
  };
});
