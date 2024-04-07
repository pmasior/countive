FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN ["npm", "ci"]

CMD ["npm", "run", "dev"]
