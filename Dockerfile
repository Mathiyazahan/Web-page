# Use the official Node.js image from the Docker Hub
FROM node:18

# Install git
RUN apt-get update && \
    apt-get install -y git

# Clone the GitHub repository into /app
RUN git clone https://github.com/Mathiyazahan/Web-page.git /app

# Set the working directory
WORKDIR /app

RUN git checkout main

# Install application dependencies
RUN npm install

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["node", "index.js"]

