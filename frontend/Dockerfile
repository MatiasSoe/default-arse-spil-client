FROM nginx:alpine

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY public/*.js public/*.css /usr/share/nginx/html/
COPY public/static/ /usr/share/nginx/html/

EXPOSE 80