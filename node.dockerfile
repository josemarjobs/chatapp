# Build: docker build -f node.dockerfile -t nodeapp .

# Start MongoDB container
# docker run -d --name my-mongodb mongo

# Start Node and link to MongoDB container
# RUN: docker run -d -p 3000:3000 --link my-mongodb:mongodb nodeapp

FROM node:latest
MAINTAINER Josemar Jobs

ENV NODE_ENV=development
ENV PORT=3000

COPY        . /var/www
WORKDIR     /var/www

RUN         npm install

EXPOSE      $PORT

ENTRYPOINT  ["npm", "start"]
