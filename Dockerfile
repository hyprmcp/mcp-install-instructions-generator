FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS builder
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY tsconfig.json tsconfig.json
COPY src/ src/
RUN pnpm build

FROM base AS runner
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
EXPOSE 3000
CMD [ "pnpm", "mcp:prod" ]
