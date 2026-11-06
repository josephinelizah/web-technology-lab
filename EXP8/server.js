
const http = require('http');
const url = require('url');

const PORT = 3000;

// Sample user data
const users = [
    { id: 1, name: 'Alice', role: 'Software Engineer' },
    { id: 2, name: 'Bob', role: 'Systems Architect' }
];

// Create HTTP server
const server = http.createServer((req, res) => {

    const path = url.parse(req.url, true).pathname;
    const method = req.method;

    console.log(method + ' request to ' + path);

    // Home page
    if (path === '/' && method === 'GET') {

        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.end(`
            <html>
            <head>
                <title>Node.js Server</title>
            </head>
            <body>
                <h1>SpeedX Bike Showroom</h1>
                <h3>Node.js Server is Active</h3>
                <p>Welcome to SpeedX Bike Showroom.</p>
                <a href="/api/users">View User Data</a>
            </body>
            </html>
        `);
    }

    // JSON API
    else if (path === '/api/users' && method === 'GET') {

        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.end(JSON.stringify({
            success: true,
            count: users.length,
            data: users
        }));
    }

    // 404 error
    else {

        res.writeHead(404, { 'Content-Type': 'application/json' });

        res.end(JSON.stringify({
            success: false,
            message: 'Resource Not Found'
        }));
    }

});

// Start server
server.listen(PORT, () => {
    console.log('Server running at http://localhost:' + PORT);
});
