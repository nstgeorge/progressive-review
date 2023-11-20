FROM node:16.19.0 AS development
ENV NODE_ENV development

WORKDIR /usr/src/app/frontend

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]