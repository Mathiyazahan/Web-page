const express = require('express');
const os = require('os');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const podHostname = os.hostname();
  const podIpAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.send(`
    <html>
    <head><title>Pod Information</title></head>
    <body>
      <h1>Pod Information</h1>
      <p>Pod Hostname: ${podHostname}</p>
      <p>Pod IP Address: ${podIpAddress}</p>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
