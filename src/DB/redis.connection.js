import { createClient } from "redis";
import { REDIS_URI } from "../../config/confi.service.js";

export const redisClient = createClient({
  url: REDIS_URI,
});

export const conenctRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis successfully");
  } catch (error) {
        console.log("Error connecting to Redis " ,error );

  }
};