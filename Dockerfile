FROM node:18-alpine

# set the working directory inside the container
WORKDIR /app

# copy the local code to the container's working directory
COPY . /app

RUN \
  npm config set registry https://registry.npmmirror.com \
  && npm i \
  && npm i -g pm2

# expose http server
EXPOSE 3000

# use pm2 to start pairlist-filter
# CMD ["pm2-runtime", "start", "src/index.js", "--name", "pairlist-filter"]
