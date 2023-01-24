const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String },
    details: { type: String },
    spec: { type: String },
    feature: { type: String },
    status: { type: String, default: "active" },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: "categories",
        required: true
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

const Product = mongoose.model('products', ProductSchema);

module.exports = Product

