#########
# BUILD #
#########

FROM node:alpine AS build

WORKDIR /livesite

# Copy configs
COPY ./package.json .
COPY ./rollup.config.js .
COPY ./svelte.config.js .
COPY ./tsconfig.json .

RUN npm i

# Copy static files
COPY ./public/ ./public/
COPY ./src/ ./src/

RUN npm run build

#######
# RUN #
#######

FROM nginx:alpine

COPY --from=build /livesite/public/ /usr/share/nginx/html/
