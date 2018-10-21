# specify Docker base image
FROM node:latest

# the folder application within the container
RUN mkdir -p /usr/src/app
WORKDIR  /usr/src/app

# install dependencies (copies 'from folder' --> 'destination folder')
COPY package.json /usr/src/app
RUN npm install
RUN npm run build

# copy application files (moved here to make use of Docker's cache machanism)
COPY ./build /usr/src/app

# startup command
CMD ["node", "index.js"]

# open container port
EXPOSE 8081
