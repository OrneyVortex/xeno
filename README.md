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




## Why We Used Kafka for Pub/Sub
Kafka is a distributed streaming platform that is highly scalable and fault-tolerant. We chose Kafka for the following reasons:

High Throughput: Kafka can handle a large number of events per second, making it ideal for applications that need to process large streams of data quickly and efficiently.
Scalability: Kafka is designed to scale horizontally by adding more brokers to distribute the load. This allows our system to handle an increasing amount of data without significant changes to the architecture.
Fault Tolerance: Kafka replicates data across multiple brokers, ensuring that even if some brokers fail, the data remains available. This makes our system robust and reliable.
Decoupling Producers and Consumers: Kafka allows producers (data ingesters) and consumers (data processors) to be decoupled. This means that producers can continue to send data even if consumers are down or slow, ensuring continuous data ingestion.
Persistent Storage: Kafka stores messages on disk, allowing for data to be replayed and reprocessed if needed. This is useful for debugging, reprocessing data, and ensuring data integrity.

## Why We Used JWT for Authentication
JSON Web Tokens (JWT) are a compact and self-contained way for securely transmitting information between parties as a JSON object. We chose JWT for the following reasons:

Stateless Authentication: JWT allows for stateless authentication. The token is self-contained, meaning it contains all the information needed for authentication and authorization, eliminating the need for server-side session storage.
Security: JWTs are signed using a cryptographic algorithm, ensuring that the token cannot be altered without invalidating the signature. This makes JWTs secure and trustworthy.
Cross-Domain Support: JWTs can be used across different domains, which is useful for Single Sign-On (SSO) scenarios where a user can authenticate with one service and access multiple services.
Ease of Use: JWTs are easy to generate and parse. They are URL-safe and can be included in HTTP headers, making them ideal for RESTful APIs.
Flexibility: JWTs can contain custom claims, allowing us to include additional information in the token. This can be used to implement fine-grained access control.
## How We Ingest Data
Data ingestion in our project involves sending data to Kafka topics via our backend API, and then consuming that data from Kafka to store it in MongoDB. Here’s a detailed overview of the process:

API Endpoints: We have two main API endpoints for data ingestion:
/customers: This endpoint accepts customer data.
/orders: This endpoint accepts order data.
Data Validation: Before sending the data to Kafka, we validate it using custom validators (customerValidator.js and orderValidator.js). This ensures that the data is correctly formatted and contains all the required fields.
Publishing to Kafka: After validation, the data is sent to the respective Kafka topic (customers or orders) using a Kafka producer. This decouples the data ingestion process from the data processing logic.
Kafka Consumer: A separate Kafka consumer service listens to the customers and orders topics. When new messages are received, they are processed and saved to the MongoDB database.
Database Updates:
For customer data, the consumer checks if the customer already exists in the database. If the customer exists, their record is updated. If not, a new record is created.
For order data, a new order record is created. The corresponding customer's record is also updated to reflect the new order, including updating the total_spend, total_visits, and last_visit fields.
This architecture ensures that our system is scalable, fault-tolerant, and capable of handling high-throughput data ingestion and processing. It also allows us to maintain a clean separation of concerns between data ingestion, validation, and storage.




