FROM node:latest as build

WORKDIR /app

COPY package.json .
COPY public/ ./public
COPY src/ ./src

RUN npm install

RUN npm install axios

RUN npm run build


FROM node:latest as runtime

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build .

EXPOSE 45800

CMD ["serve", "-s", ".", "-l", "45800"]