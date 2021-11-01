import { Router } from "express";
import { redisClient } from "../../../messaging/index.js";

var indexRouter = Router();

indexRouter.get('', (request, response) => {
    let transactions = []
    redisClient.lrange('mpesa-transactions', 0, -1, (error, data) => {
        const payments = Array.from(data)
        for (var i = 0; i < payments.length; i ++) {
            const transaction = JSON.parse(payments[i])
            transactions.push(transaction)
        }
        response.send({payments: transactions})
    });
})

export default indexRouter;