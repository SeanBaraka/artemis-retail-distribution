import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    shop: Number,
    receiptNumber: String,
    paymentMethod: String,
    amount: Number,
    amountReceived: Number
})

export const Sale = mongoose.model('Sale', saleSchema)