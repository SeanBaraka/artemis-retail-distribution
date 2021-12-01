import { Router } from "express";
import { redisClient } from "../../../messaging/index.js";
import { Sale } from "../models/sale.js";

import * as admin from 'firebase-admin';
const serviceAccount = require('../firebase.account.key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });


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

indexRouter.post('/sellorder', async(request, response) => {
    const {shop, data } = request.body;
    const io = request.io;

    const saleRecord = new Sale({
        shop: shop,
        receiptNumber: data.receiptNumber,
        paymentMethod: data.paymentMethod,
        amount: data.totalAmount,
        amountReceived: data.amountReceived
    })

    try {
        // Attempt to save the received sell record
        const sell = await saleRecord.save();
        if (sell) {
            // Emit a websocket event to the GUI, updating the new list of sale records
            io.emit('update-sale', sell);

            // send a firebase notification to the mobile client
            admin.messaging().send({
                notification: {
                    title: "Realtime sales !!",
                    body: `A new sale has been made\nReceipt #${sell.receiptNumber}\nAmount KES. ${sell.amount}\nShop ${shop}`
                }
            })
            .then((response) => {
                console.log('sell notification should be sent')
            })
            .catch((err) => {
                console.log('sell notification not sent', err.message)
            })
            response.send({status: 200, message: 'sale recorded'})
        }
    } catch (error) {
        console.log('an error occured during execution', error.code)
        response.status(500).send({status: 500, message: error.message})
    }
})

indexRouter.get('/quick-sales', (request, response) => {
    const socket = request.io
    socket.emit('ping', ('pong data'));
    response.send({sales: 'ok'})
})

export default indexRouter;