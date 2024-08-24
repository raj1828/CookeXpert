const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
       user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
       },
       recipe: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Recipe',
       },
       comment: {
              type: String,
              required: true,
       },
       rating: {
              type: Number,
              required: true,
       },
       createdAt: {
              type: Date,
              default: Date.now,
       }
});
module.exports = mongoose.model('Feedback', FeedbackSchema);