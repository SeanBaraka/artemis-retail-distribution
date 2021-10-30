import { Kafka } from "kafkajs";
import { createClient } from "redis";

export const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'artemis-core',
})

export const redis = createClient(6379)
