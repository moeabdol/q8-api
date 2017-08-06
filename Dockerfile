# Create image from nodejs base image
FROM node:6

# Clone the repo from github
RUN git clone https://github.com/moeabdol/q8-api

# Change working directory to the cloned repo
WORKDIR /q8-api

# Install all the dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
