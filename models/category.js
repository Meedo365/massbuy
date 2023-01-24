const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, default: "Others" },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            },
        },
        timestamps: true
    });

const Category = mongoose.model('categories', CategorySchema);

module.exports = Category;