import { Partitioners } from "kafkajs";
import { kafka } from "./index.js";

export const kafkaProducer = kafka.producer({
  allowAutoTopicCreation: true,
  createPartitioner: Partitioners.LegacyPartitioner,
});

export const connectProducer = async () => {
  await kafkaProducer.connect();
};

export const sendMessage = async (userId, topic, message) => {
  await kafkaProducer.send({
    topic,
    messages: [{ key: userId, value: JSON.stringify(message) }],
  });
};

kafkaProducer.connect();
