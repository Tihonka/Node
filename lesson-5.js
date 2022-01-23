#!/usr/local/bin/node
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const go = async () =>{
http.createServer((req, res) =>{

res.writeHead(200, 'ok', {          
  'Content-type' : 'text/html', 
});
let executionDir = req.url
const fullPath = path.join(process.cwd(), executionDir);
console.log(fullPath);

if (!fs.existsSync(fullPath)) return res.end('Такой директории нет');

if (fs.lstatSync(fullPath).isFile()) {
    return fs.createReadStream(fullPath).pipe(res);
}
let fullPathList = '';

        fs.readdirSync(fullPath)
            .forEach(fileName => {
                const filePath = path.join(req.url, fileName);
                fullPathList += `<li><a href="${filePath}">${fileName}</a></li>`;
            });

        res.write(fullPathList)
        return res.end();

}).listen(5555, 'localhost');
};

go();
