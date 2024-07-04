FROM node

COPY . /backend
WORKDIR /backend
RUN npm install --force
EXPOSE 8000
CMD ["npm" , "start"]
