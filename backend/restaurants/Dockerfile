# Use the official Node.js image
FROM --platform=linux/amd64 node:14-alpine

# Set the working directory
WORKDIR /app/restaurants

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY nodemon.json ./

# Install dependencies
RUN npm install 
COPY . .
RUN npx prisma generate
RUN npm run build
# Expose the port that the app will run on
EXPOSE 3002
# Start the app
CMD npm run dev