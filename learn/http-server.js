const http = require('http');

const port = 4000;

const server = http.createServer((req, res) => {
    res.end('Hello World');
});

server.listen(port, () => {
    console.log(`Server running 🚀 at http://localhost:${port}/`);
});