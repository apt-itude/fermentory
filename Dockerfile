FROM node:8

RUN apt-get update && \
    apt-get install -y bluetooth bluez libbluetooth-dev libudev-dev

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD [ "npm", "start" ]
