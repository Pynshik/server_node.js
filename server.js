const http = require('http');
const qs = require('querystring')
const hostname = '127.0.0.1';
const port = 3000;
const users = [
    {name:'Kate'},
    {name:'Ron'},
    {name: 'Bob'}
];
const server = http.createServer((req, res) => {
    if(req.method === 'GET'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(users));
        res.end()    
    }
    else if(req.method === 'POST') {
        let body = '';
        req.on('data', function(chunk) {
            body += chunk;
            users.push(JSON.parse(body));
        });
        req.on('end', function() {
            res.end('user добавлен');
        });
    }
    else {
        let body = '';
        let removed = [];
        req.on('data', function(chunk) {
            body += chunk;
            removed = users.splice(0, users.length, ...JSON.parse(body));
        });
        req.on('end', function() {
            res.end('Массив users изменен');
        });
    }
});
server.listen(port, hostname, ()=>{
    console.log(`Server running`);
});