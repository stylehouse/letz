FROM node:slim
WORKDIR /app
#RUN apk add --no-cache git curl bash unzip curl strace vim nodejs yarn
RUN apt-get update && apt-get install -y \
    imagemagick less
# turn on pdf support for imagemagick
RUN sed -i 's/<policy domain="coder" rights="none" pattern="PDF" \/>/<policy domain="coder" rights="read | write" pattern="PDF" \/>/g' /etc/ImageMagick-*/policy.xml

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

