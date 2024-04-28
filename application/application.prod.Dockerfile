FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN ["npm", "ci"]

COPY backend ./backend
COPY pages ./pages
COPY prisma ./prisma
COPY public ./public
COPY src ./src
COPY next.config.js ./
COPY tsconfig.json ./
RUN ["npx", "prisma", "generate"]
RUN ["npm", "run", "build"]

CMD ["npm", "run", "start"]
