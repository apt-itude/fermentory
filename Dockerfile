FROM balenalib/raspberrypi3-node:8-build as builder

RUN install_packages libudev-dev

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install


FROM balenalib/raspberrypi3-node:8

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app
COPY src/ src/
COPY .babelrc .

ENV UDEV=1

CMD [ "npm", "start" ]
