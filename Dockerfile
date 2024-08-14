# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the HTML file into the container
COPY index.html /app/index.html

# Install a simple HTTP server
RUN npm install -g http-server

# Start the HTTP server
CMD ["http-server", "-p", "8080"]
