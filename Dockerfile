
#CERTBOT_EMAIL_ADDRESS - For certbot to do registration
#CERTBOT_DOMAIN_NAME - For certbot to do registration
#SILKSTART_API_KEY - For silkstart API integration

FROM node:10
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 8080
CMD [ "npm", "start" ]
