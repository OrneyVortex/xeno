# Customer Management and Audience Creation Application

This project is a web application that allows users to manage customer data, create audiences based on various rules, and view past campaigns. The backend is built with Node.js, Express, Kafka, and MongoDB. The frontend is a React application styled with Chakra UI.

## Features

- **Customer Management**: Add and manage customer data.
- **Audience Creation**: Create audiences based on rules such as total spends, number of visits, and last visit date.
- **Campaign Management**: View a list of past campaigns with the latest campaign on top.
- **JWT**: Secure login in the application with JSON webtoken authentication.
- **Data Ingestion API**: Efficiently ingest customer and order data via a RESTful API.

## Prerequisites
Node.js
MongoDB
Kafka
Chakra UI

## Install dependencies in the API folder and the full-stack-crm-main/server and full-stack-crm-main/client :
- npm install
## Configure MongoDB and Kafka:
 ** dbConfig.js
module.exports = {
  mongoURI: 'your-mongodb-uri'
};

** kafkaConfig.js
module.exports = {
  kafkaHost: 'your-kafka-host'
};


