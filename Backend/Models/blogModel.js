const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        minLength: 3,
        trim: true,
        required: true
    },
    body: {
        type: String,
        minLength: 3,
        required: true
    },
    category: {
        type: String,
        enum: ['Sports', 'Entertainment', 'Games', 'Science', 'Technology', 'Health', 'Travel', 'Food','help',  'Other'],
        validator: {
            validate: (v) => {
                return v && v.length > 0
            },
            message: 'Please enter a category'
        }
    },
    // user_id: {
    //     type: String,
    //     required: true
    // }
}, {timestamps: true})

module.exports = mongoose.model('Blog', blogSchema);