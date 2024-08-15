const express = require('express');
const os = require('os');
const app = express();
const port = 8080;

// Middleware to respond with pod information
app.get('/info', async (req, res) => {
    try {
        const podIP = os.networkInterfaces().eth0[0].address; // or eth1, depends on your setup
        const podHostname = os.hostname();
        res.send(`
            <h1>Pod Information</h1>
            <p>Pod Hostname: ${podHostname}</p>
            <p>Pod IP Address: ${podIP}</p>
        `);
    } catch (error) {
        res.status(500).send('Error retrieving pod information');
    }
});

// Server
app.listen(port, () => {
    console.log(`Server running at http://0.0.0.0:${port}/`);
});
