# specify Docker base image
FROM node:latest

# the folder application within the container
RUN mkdir -p /usr/src/app
WORKDIR  /usr/src/app

# copies package.json to container and install dependencies
COPY package.json /usr/src/app
RUN npm install

# copies application files to container and generates build
COPY . /usr/src/app
RUN npm run build

# startup command
CMD ["npm", "run", "start-build"]

# open container port
EXPOSE 8081
