const kafka = require('kafka-node');
const mongoose = require('mongoose');
const Customer = require('./models/Customer');
const Order = require('./models/Order');
const { kafkaHost } = require('../config/kafkaConfig');
const { mongoURI } = require('../config/dbConfig');

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Set up Kafka Consumer
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost });
const consumer = new Consumer(
  client,
  [
    { topic: 'customers', partition: 0 },
    { topic: 'orders', partition: 0 }
  ],
  {
    autoCommit: true
  }
);

consumer.on('message', async function (message) {
  const data = JSON.parse(message.value);
  try {
    if (message.topic === 'customers') {
      await handleCustomer(data);
    } else if (message.topic === 'orders') {
      await handleOrder(data);
    }
  } catch (err) {
    console.error('Error processing message', err);
  }
});

const handleCustomer = async (data) => {
  let customer = await Customer.findOne({ id: data.id });
  if (!customer) {
    customer = new Customer(data);
  } else {
    customer.set(data);
  }
  await customer.save();
  console.log('Customer data saved:', customer);
};

const handleOrder = async (data) => {
  const order = new Order(data);
  await order.save();
  
  const customer = await Customer.findOne({ id: data.customerId });
  if (customer) {
    customer.total_spend += data.amount;
    customer.total_visits += 1;
    customer.last_visit = new Date();
    await customer.save();
    console.log('Order data saved and customer updated:', order, customer);
  } else {
    console.log('Customer not found for order:', order);
  }
};

consumer.on('error', function (err) {
  console.error('Error in Kafka Consumer', err);
});
