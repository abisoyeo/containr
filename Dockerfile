FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY server/ .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]