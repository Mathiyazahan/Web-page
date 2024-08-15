const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    const podIp = process.env.POD_IP || 'unknown';
    const hostname = require('os').hostname();
    res.send(`<h1>Pod Information</h1>
              <p>Pod Hostname: ${hostname}</p>
              <p>Pod IP Address: ${podIp}</p>`);
});
 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
