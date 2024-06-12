const kafka = require('kafka-node');
const { kafkaHost } = require('../config/kafkaConfig');

const client = new kafka.KafkaClient({ kafkaHost });
const producer = new kafka.Producer(client);

producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (err) => {
  console.error('Error in Kafka Producer', err);
});

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

module.exports = sendToKafka;
