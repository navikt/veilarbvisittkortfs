FROM navikt/pus-nginx

ENV CONTEXT_PATH=veilarbvisittkortfs
COPY build /usr/share/nginx/html/veilarbvisittkortfs