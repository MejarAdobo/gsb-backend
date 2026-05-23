FROM oven/bun:latest

WORKDIR /app

COPY package*.json bun.lock ./
RUN bun install --production
COPY . .

CMD ["bun", "src/index.ts"]
