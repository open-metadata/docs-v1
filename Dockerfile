# Rebuild the source code only when needed
FROM node:22-slim AS builder
WORKDIR /docs
COPY . .

RUN mkdir -p public/ingestion/connectors

# RUN yarn build && yarn install --production --ignore-scripts --prefer-offline
RUN yarn install && yarn build

FROM builder AS runner

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["yarn", "start"]
