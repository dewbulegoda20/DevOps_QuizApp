# Use a lightweight Node.js image
FROM node

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the server port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
