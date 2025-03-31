FROM node:20.13.1

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

# Add this environment variable to address potential host issues with React
ENV HOST=0.0.0.0

CMD ["npm", "start"]