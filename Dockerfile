FROM node:carbon-slim

# Create app directory
WORKDIR /git/bet-api

# Install app dependencies
COPY package.json /git/bet-api/
RUN npm install

# Bundle app source
COPY . /git/bet-api/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]

EXPOSE 5000
