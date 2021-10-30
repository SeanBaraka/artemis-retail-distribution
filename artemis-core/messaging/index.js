import { kafka, redis } from "./config/client.js";

const kafkaClient = kafka;
const redisClient = redis;

// This is the global kafka client to be used across the entire app
export { kafkaClient, redisClient };