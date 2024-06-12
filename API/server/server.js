const express = require('express');
const bodyParser = require('body-parser');
const { KafkaClient, Producer } = require('kafka-node');
const validateCustomer = require('./validators/customerValidator');
const validateOrder = require('./validators/orderValidator');
const { kafkaHost } = require('../config/kafkaConfig');

const app = express();
app.use(bodyParser.json());

// Initialize Kafka Producer
const client = new KafkaClient({ kafkaHost });
const producer = new Producer(client);

producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (err) => {
  console.error('Error in Kafka Producer', err);
});

// Function to send data to Kafka
const sendToKafka = (topic, message) => {
  const payloads = [{ topic, messages: JSON.stringify(message) }];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Failed to send message to Kafka', err);
    } else {
      console.log('Message sent to Kafka', data);
    }
  });
};

// Endpoint to handle customer data
app.post('/api/customers', async (req, res) => {
  try {
    const customer = await validateCustomer(req.body);
    sendToKafka('customers', customer);
    res.status(200).send({ message: 'Customer data accepted' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Endpoint to handle order data
app.post('/api/orders', async (req, res) => {
  try {
    const order = await validateOrder(req.body);
    sendToKafka('orders', order);
    res.status(200).send({ message: 'Order data accepted' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
