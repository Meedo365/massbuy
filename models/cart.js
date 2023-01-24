const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    duration: { type: Number, required: true, default: 12 },
    category: { type: String, },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    package_id: {
        type: mongoose.Types.ObjectId,
        ref: "packages"
    },
    product_id: [{
        item: {
            type: mongoose.Types.ObjectId,
            ref: "products"
        },
        qty: { type: Number, default: 1 }
    }],
    frequency: {
        type: String, required: true,
        enum: ["daily", "weekly", "monthly"]
    },
    total: {
        type: Number, required: true
    },
    daily: {
        type: Number
    },
    weekly: {
        type: Number
    },
    monthly: {
        type: Number
    },
    status: {
        type: String, default: "active"
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

const Cart = mongoose.model('carts', CartSchema);

module.exports = Cart;