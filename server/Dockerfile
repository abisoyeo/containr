FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy rest of app
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
