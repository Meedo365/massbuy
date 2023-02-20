const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    dueDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ["Active", "Pending", "Completed", "Cancelled"]
    },
    frequency: { type: String, required: true },
    deliveryId: {
        type: mongoose.Types.ObjectId,
        ref: "delivery"
    },
    cartId: {
        type: mongoose.Types.ObjectId,
        ref: "carts"
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
    timestamps: true
});

const Order = mongoose.model('orders', OrderSchema);

module.exports = Order;