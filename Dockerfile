# Build Stage
FROM node:20-alpine AS build
WORKDIR /src
COPY . .
RUN npm install
RUN npm run build

# Runtime Stage
FROM node:20-alpine
WORKDIR /src
COPY --from=build /src ./
CMD ["npm", "start"]
