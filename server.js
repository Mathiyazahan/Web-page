const express = require('express');
const os = require('os');
const path = require('path');
const app = express();

let count = 0;

// Function to get the pod IP address
function getPodIp() {
    const interfaces = os.networkInterfaces();
    let podIp = 'IP not found';

    for (const iface of Object.values(interfaces)) {
        for (const alias of iface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                podIp = alias.address;
                break;
            }
        }
    }

    return podIp;
}

// API to get the pod IP address
app.get('/pod-ip', (req, res) => {
    const podIp = getPodIp();
    res.json({ podIp });
});

app.get('/', (req, res) => {
    console.log("Fetching pod ip ${count++}")
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





