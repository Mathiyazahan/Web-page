const express = require('express');
const os = require('os');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8080;

// Kubernetes API endpoint (adjust if necessary for your setup)
const k8sApiEndpoint = 'http://kubernetes.default.svc/api/v1/namespaces/mathiyalagan/pods';

// Function to get the Kubernetes service account token from the default mount path
const getServiceAccountToken = () => {
    try {
        return fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/token', 'utf8');
    } catch (err) {
        console.error('Error reading service account token:', err);
        return null;
    }
};

// Get token
const token = getServiceAccountToken();

app.get('/', async (req, res) => {
    try {
        if (!token) {
            res.status(500).send('Service account token is missing');
            return;
        }

        // Fetch pod information from Kubernetes API
        const response = await axios.get(k8sApiEndpoint, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        // Check if response status is 200 OK
        if (response.status !== 200) {
            console.error(`Error fetching data: HTTP ${response.status} - ${response.statusText}`);
            res.status(response.status).send('Error fetching pod information');
            return;
        }

        const pods = response.data.items;
        const podIps = pods.map(pod => pod.status.podIP).filter(ip => ip !== undefined);

        // Get hostname and IP address from environment variables
        const podIp = process.env.POD_IP || 'unknown';
        const hostname = os.hostname();

        // Send the response
        res.send(`<h1>Pod Information</h1>
                  <p>Pod Hostname: ${hostname}</p>
                  <p>Pod IP Address: ${podIp}</p>
                  <p>All Pod IPs: ${podIps.join(', ')}</p>`);
    } catch (error) {
        console.error('Error fetching pod information:', error.message);
        res.status(500).send('Error fetching pod information');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
