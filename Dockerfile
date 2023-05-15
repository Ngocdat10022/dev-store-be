FROM node:16.15.0
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["npm","run","start"]
EXPOSE 6000