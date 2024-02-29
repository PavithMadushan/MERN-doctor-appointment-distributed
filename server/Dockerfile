# # Use an official Node runtime as a parent image
# FROM node:12

# # Set the working directory in the container to /app
# WORKDIR /app

# # Add the current directory contents into the container at /app
# ADD . /app

# # Update pip
# # RUN pip3 install --upgrade pip

# # Install necessary packages
# RUN apt-get update && apt-get install -y --fix-missing unixodbc-dev gnupg curl
# # RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
# # RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list
# # RUN apt-get update
# # RUN ACCEPT_EULA=Y apt-get install -y msodbcsql17


# COPY package*.json /app
# RUN npm install

# EXPOSE 5000

# # Run server.py when the container launches
# CMD ["npm", "start"]


# Use an official Node runtime as a parent image
FROM node:12

# Set the working directory in the container to /app
WORKDIR /app

# Add the current directory contents into the container at /app
ADD . /app

COPY package*.json /app
RUN npm install

EXPOSE 5000

# Run server.py when the container launches
CMD ["npm", "start"]
