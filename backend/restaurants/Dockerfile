# Use the official Node.js image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy the rest of the app's files to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000
# Start the app
CMD ["npm", "run", "dev"]