const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
       title: {
              type: String,
              required: true
       },
       ingredients: {
              type: [String],
              required: true
       },
       instructions: {
              type: String,
              required: true
       },
       user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
       },
       rating: {
              type: Number,
              default: 0
       },
       createdAt: {
              type: Date,
              default: Date.now,
       }

});

module.exports = mongoose.model('Recipe', RecipeSchema);