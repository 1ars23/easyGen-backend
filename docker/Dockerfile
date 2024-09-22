FROM node:18 as dev

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18 as prod

ENV NODE_OPTIONS="--max_old_space_size=16384"
WORKDIR /usr/src/app

COPY --from=dev /usr/src/app/ .

# Apply Node.js memory limit in CMD
CMD ["node", "--max-old-space-size=16384", "dist/main"]

# RUN npm run migrate:up

# CMD ["node", "dist/main"]
# CMD ["npm", "run", "migrate:up"]
