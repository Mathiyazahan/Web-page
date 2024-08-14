const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const port = 8080;

const server = http.createServer((req, res) => {
    if (req.url === '/pod-ip') {
        // Respond with the Pod IP address
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ ip: process.env.POD_IP || 'unknown' }));
    } else {
        // Serve the static HTML file
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
