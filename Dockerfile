
FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json ./
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN corepack enable

RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm install --frozen-lockfile; \
    elif [ -f yarn.lock ]; then \
      yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    else \
      npm install; \
    fi

FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm build; \
    elif [ -f yarn.lock ]; then \
      yarn build; \
    else \
      npm run build; \
    fi

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001


COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder /app/.next/standalone ./

USER nextjs
CMD ["node", "server.js"]
