FROM balenalib/raspberrypi3-node:8-build

RUN install_packages libudev-dev

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src/ src/
COPY .babelrc .

ENV UDEV=1

CMD [ "npm", "start" ]
