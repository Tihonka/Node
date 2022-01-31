const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) =>{
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

let list = [];

io.on('connection', client =>{
     client.on('user-connect', (userName) =>{
       client.broadcast.emit('newUser', userName);
       client.emit('userName', userName);
   });

    client.on('client-msg', (data) =>{
       client.broadcast.emit('server-msg', data);
       client.emit('server-msg', data);
    });

    client.on('users-online', (usersOnline) =>{
        client.broadcast.emit('usersUpdate', usersOnline);
        list.push({id: client.id, name: usersOnline});
        client.emit('usersUpdate', Array.from(list, x => x.name).join(''));
    });

    client.on('disconnect', () =>{  
        const index = list.findIndex(i => i.id === client.id);
        const name = (list[index].name).replace('<li>', '').replace('</li>', '');
        list.splice(index, 1);

        client.broadcast.emit('logout', name);
        client.broadcast.emit('userlogout', Array.from(list, x => x.name).join(''));
    });
  
});

server.listen(5555);