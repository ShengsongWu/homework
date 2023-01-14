FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=US/Pacific

ADD ./docker /docker
ADD ./backend /code
ADD ./frontend /frontend

RUN docker/install.sh

WORKDIR /code
CMD bash /docker/start.sh

EXPOSE 80
