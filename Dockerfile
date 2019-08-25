FROM node:12
WORKDIR /home/confi

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3000 9229

ENTRYPOINT npm run start
