FROM node

ENV MONGO_DB_USERNAME=aastha_admin\
    MONGO_DB_PWD=aastha_password

RUN mkdir -p docker/Form-app

COPY . /docker/Form-app 

CMD ["node", "/docker/Form-app/server.js"]

