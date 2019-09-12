FROM node as builder

ADD / /source
ENV CI=true
WORKDIR /source
RUN npm ci
ENV NODE_ENV=production
RUN npm run build

FROM nginx

COPY --from=builder /source/build /usr/share/nginx/html/veilarbvisittkortfs