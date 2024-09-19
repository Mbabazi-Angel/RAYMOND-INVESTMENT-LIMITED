FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /raymond-limited

# Copy package.json and package-lock.json (if available)
COPY raymond-limited/package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code
COPY raymond-limited/ ./

# Build the React app
RUN npm run build

# Expose the port Nginx will serve on
EXPOSE 3000

# Start Nginx
CMD ["npm", "start"]