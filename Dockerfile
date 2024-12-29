FROM node:22-alpine

# Set the working directory
WORKDIR /app
# Copy the package.json and package-lock.json files
COPY package*.json ./
# Install the dependencies
RUN npm install
# Copy the app files
COPY . .
# Expose the port
ENV PORT=3001
EXPOSE 3001
# Run the app
CMD ["npm", "run", "dev"]