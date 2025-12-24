
FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi && npm cache clean --force

FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

ARG BACKEND_URL=http://backend:8080
ENV BACKEND_URL=$BACKEND_URL

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

USER nextjs

EXPOSE 3000


HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["node", "server.js"]
