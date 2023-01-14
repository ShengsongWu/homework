#!/usr/bin/env bash
set -e

mkdir -p /usr/share/man/man1 /usr/share/man/man7

apt-get update && apt-get install -y \
  dialog apt-utils \
  curl \
  gcc g++ \
  gnupg \
  openssl \
  libssl1.1 \
  python3-pip \
  && apt-get clean

echo "Node repos"
# Node repos
curl -sL https://deb.nodesource.com/setup_14.x | bash -

apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    nginx \
    nodejs \
    sudo \
    libssl-dev \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

pip3 install circus

# To remove unnecessary packages afterwards and reduce image size
apt-get purge -y --auto-remove gnupg cmake

pwd
cd /code/
# Install dependencies
npm config set registry=https://registry.npmjs.org/
npm install
