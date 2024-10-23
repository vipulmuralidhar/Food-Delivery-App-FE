# step 1 we built the angular app using the production config
FROM node:20 AS build

# step2 Set the working directory
WORKDIR /app

# Copy the pakage.json and package-locak.json files
COPY package*.json ./

# Run a clean install of the dependenicies  
RUN npm ci

#Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy all files
COPY . .

#Built the application
RUN npm run build --configuration=production


# Step 2: We use the nginx image to serve the application
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/food-delivery-app/browser /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80