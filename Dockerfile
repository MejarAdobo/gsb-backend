FROM oven/bun:latest

WORKDIR /app

COPY package*.json bun.lock ./
RUN bun install --production
COPY . .

ENV TZ=Canada/Vancouver

CMD ["bun", "src/index.ts"]
