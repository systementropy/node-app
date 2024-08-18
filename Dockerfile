FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "start.sh", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
ENTRYPOINT . ./start.sh
# RUN npm run prebuild
# ENTRYPOINT bash ./start.sh
# CMD "npm", "run prebuild" && "npm", "start"
# CMD ["npm", "start"]
# ENTRYPOINT ["node", "src/index.js"]