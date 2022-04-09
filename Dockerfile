FROM node:lts-alpine as build-stage
WORKDIR /app
# COPY package.json ./
# COPY yarn.lock ./
# COPY .npmrc ./
# RUN npm install yarn -g
COPY . .
RUN ls
RUN yarn install
RUN yarn build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]