# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .
COPY .env.production .env

RUN npm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
