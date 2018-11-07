FROM node:8

WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
RUN mv /usr/src/app/node_modules /node_modules
EXPOSE 3000
CMD [ "npm", "start" ]