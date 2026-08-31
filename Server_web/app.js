import {createServer} from 'node:http';
import {createReadStream} from 'node:fs';
const server = createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log(url);
    res.write(`Bonjour ${url.searchParams.get('name')}`);
    res.end();
   
   /* res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    const file = createReadStream('index.html');
    file.pipe(res , {end: false});
    file.on('end', () => {
        res.end();
    })    */   
 });

server.listen('8888')