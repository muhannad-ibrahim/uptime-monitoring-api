# Uptime Monitoring RESTful API Server
This repository contains a backend application for an uptime monitoring RESTful API server. The server allows authenticated users to monitor URLs and retrieve detailed uptime reports about their availability, average response time, and total uptime/downtime.

## Features
- Signup functionality with email verification.
- CRUD operations for URL checks. Only the user who created a check can perform GET, PUT, and DELETE operations on that check.
- Notifications for authenticated users whenever one of their URLs goes down or up again. Notifications can be sent via email.
- Detailed uptime reports for authenticated users, including URL availability, average response time, and total uptime/downtime.
- Grouping of checks by tags and generation of reports based on tags.

## Installation and Setup
1. Clone this repository to your local machine.
2. Install the required dependencies by running the following command:

       npm install
3. Create a .env file in the root directory of the project and provide the necessary environment variables. Refer to the .env.example file for the required variables.
4. Start the server by running the following command:

        npm start
The server will start running on http://localhost:3000.

## API Documentation
API documentation is available at http://localhost:3000/api-docs/. It provides detailed information about the available routes, request payloads, and response structures.

## Docker
To run the application using Docker, follow these steps:

1. Make sure Docker is installed on your machine.
2. Build the Docker image using the provided Dockerfile by running the following command in the root directory of the project:

        docker build -t uptime-monitoring-api .
3. Once the image is built, start a Docker container with the following command:

        docker run -p 3000:3000 -d uptime-monitoring-api

The server will start inside a Docker container and will be accessible at http://localhost:3000.

## Routes
### User Routes
- Sign up a user
        
      POST /user/signup
      
- Authenticate user

      GET /user/auth
      
- Log in a user
 
      POST /user/login

- Log out a user

      GET /user/logout
      
### Check Routes
- Create a new check

      POST /check

- Get all checks
      
      GET /check

- Get reports for a check by URL
      
      GET /check/reports

- Update a check by ID
      
      PUT /check/:id

- Delete a check by ID
      
      DELETE /check/:id

- Get reports for checks with a specific tag

      GET /check/tags/:tag
      
## Technologies Used
- Node.js
- Express.js
- MongoDB
- Swagger
- Docker