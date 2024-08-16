const express = require('express');
const os = require('os');
const app = express();
const port = process.env.PORT || 8080;

let count=0;

app.get('/', (req, res) => {
    const podIp = getPodIp();
    const hostname = os.hostname();
    console.log(`Count  ${count++}`);
    console.log(`Server running on hostname ${hostname}`);
    console.log(`Server running on podIp ${podIp}`);
    
    res.send(`<h1>Pod Information</h1>
              <p>Pod Hostname: ${hostname}</p>
              <p>Pod IP Address: ${podIp}</p>`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Function to retrieve Pod IP dynamically
function getPodIp() {
    // If you want to get IP from the Downward API or other sources,
    // you should ensure the environment or service configuration updates it properly
    // Alternatively, here is a way to fetch it using internal service calls
    const podIp = process.env.POD_IP || 'unknown';
    return podIp;
}
