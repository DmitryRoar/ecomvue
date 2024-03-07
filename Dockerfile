FROM node:18-alpine

# Create a non-root user and switch to it

# Set the working directory in the container
USER root
WORKDIR /app_js
# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Create a directory for yarn cache
RUN mkdir -p /app/.yarn/cache

# Install app dependencies as a temporary root user
RUN yarn install


# Copy the application code to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the application
RUN yarn build
CMD ["yarn", "start"]
