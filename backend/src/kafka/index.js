import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "real-time-tracker",
  brokers: ["localhost:9092"],
});
