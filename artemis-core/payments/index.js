import { kafkaClient, redisClient } from "../messaging/index.js";

const consumer = kafkaClient.consumer({
    groupId: 'payments'
})

async function init() {
    await consumer.connect();
    await consumer.subscribe({topic: 'payment-confirmations', fromBeginning: true})

    await consumer.run({
        eachMessage: async({topic, partition, message}) => {
            const transaction = message.value.toString();
            redisClient.lpush('mpesa-transactions', transaction)
        }
    })
}


// start the service
init();