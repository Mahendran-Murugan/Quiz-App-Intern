FROM node

COPY . /frontend

WORKDIR /frontend

COPY package.json .

RUN npm install --force

EXPOSE 3000

CMD ["npm",  "start"]
