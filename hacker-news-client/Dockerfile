# pull official base image
FROM node:12.18-alpine

ENV PORT 4002
# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./

RUN npm ci --only=production

# add app
COPY . .

EXPOSE 4002

# start app
CMD ["npm", "start"]