FROM node:slim
WORKDIR /app
#RUN apk add --no-cache git curl bash unzip curl strace vim nodejs yarn
#RUN apt-get update && apt-get install -y \
#        unzip curl strace vim nodejs npm

#COPY bun.install .
#RUN ./bun.install
#ENV BUN_INSTALL="/root/.bun"
#ENV PATH="$BUN_INSTALL/bin:$PATH"

#COPY ["package.json", "./"]

#COPY . .
#RUN npm install
#RUN bun install
#CMD ["node","index.js"]


CMD bash

EXPOSE 3000

