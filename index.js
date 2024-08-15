// index.js
const express = require('express');
const os = require('os');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const podIP = process.env.POD_IP || 'unknown';
  const hostname = os.hostname();
  res.status(200).send(`Hello from pod with IP: ${podIP}, Hostname: ${hostname}\n`);
});

app.listen(port, () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
