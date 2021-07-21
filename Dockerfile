FROM cypress/included:7.7.0

WORKDIR /usr/src/app

COPY ./package*.json .
COPY ./cypress.json .
COPY ./cypress ./cypress

RUN npm install

ENTRYPOINT ["npm", "run"]