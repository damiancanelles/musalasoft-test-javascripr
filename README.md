Gateways

Installation
To install the dependencies for this project, run the following command:

npm install

Configuration
Before starting the server, you will need to set up some environment variables. Create a file named .env in the root of the project and add the following line:

MONGO_URL=<your_mongo_db_url>

Replace <your_mongo_db_url> with the URL of your MongoDB database.

Starting the Server
To start the server, run the following command:

npm start

The server will start listening on port 3000.

Running Tests
To run the tests for this project, use the following command:

npm run test

API Testing
In the project folder, you will find an Insomnia_2022-12-21.json file. You can import this file into Insomnia to test the API endpoints.