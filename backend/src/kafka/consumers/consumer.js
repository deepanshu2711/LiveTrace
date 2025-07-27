import { redis } from "../../config/redis.js";
import { connectDb } from "../../db.js";
import { saveLocationToMongo } from "../../helpers.js";
import { kafka } from "../index.js";

export const startConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "mongo-writer" });
  await consumer.connect();
  await consumer.subscribe({ topic: "user-location", fromBeginning: false });
  await connectDb();

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());
      console.log("data came to this consumer", process.pid, data.userId);
      await saveLocationToMongo(data);
      await redis.set(
        `user:${data.userId}:latest_location`,
        JSON.stringify(data),
      );
    },
  });
};
