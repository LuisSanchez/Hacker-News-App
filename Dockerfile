FROM node:12.18-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
ENV DB_CONNECTION "mongodb://mongodb:27017/mongo-hacker-news"
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install
# Production
RUN npm ci --only=production
COPY . .
EXPOSE 3500
CMD ["npm", "start"]