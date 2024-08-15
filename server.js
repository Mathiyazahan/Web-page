const express = require('express');
const os = require('os');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('.'));

// Endpoint to get pod information
app.get('/info', (req, res) => {
    const podIP = req.ip || 'unknown';
    console.log(`Pod IP Address: ${podIP}`); // Log the IP address to the console
    res.json({
        hostname: os.hostname(),
        podId: process.env.POD_ID || 'unknown',
        podIP: podIP
    });
});
 
app.listen(port, () => {
    console.log(`Server running at http://0.0.0.0:${port}/`);
});
