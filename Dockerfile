# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the application files
COPY server.js index.html /app/

# Install necessary packages (if any)
RUN npm install

# Expose the port the app runs on
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
