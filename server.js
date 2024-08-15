const express = require('express');
const os = require('os');
const path = require('path');
const app = express();

let count = 0;

// Function to get the pod IP address
function getPodIp() {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        for (const alias of iface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address; // Return the first non-internal IPv4 address
            }
        }
    }
    return 'IP not found';
}

// Function to get the pod hostname
function getPodHostname() {
    return os.hostname(); // Gets the hostname of the pod
}

// API to get the pod IP address
app.get('/pod-ip', (req, res) => {
    const podIp = getPodIp(); // Retrieve the pod IP
    res.json({ podIp }); // Return as JSON
});

// API to get the pod hostname
app.get('/host-name', (req, res) => {
    const hostname = getPodHostname(); // Retrieve the pod hostname
    res.json({ hostname }); // Return as JSON
});

// Serve the HTML file
app.get('/', (req, res) => {
    console.log(`Fetching pod ip ${count++}`);
    res.sendFile(path.join(__dirname, 'index.html')); // Serve the HTML file
});

// Define the port and start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
