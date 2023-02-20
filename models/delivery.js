const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    address: { type: String, required: true },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "users",
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

const Delivery = mongoose.model('delivery', DeliverySchema);

module.exports = Delivery;