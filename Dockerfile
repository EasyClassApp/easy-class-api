# specify Docker base image
FROM node:latest

# the folder application within the container
RUN mkdir -p /usr/src/app
WORKDIR  /usr/src/app

# install dependencies (copies 'from folder' --> 'destination folder')
COPY package.json /usr/src/app
RUN npm install
RUN npm run build

# startup command
CMD ["npm", "run", "start-build"]

# open container port
EXPOSE 8081
