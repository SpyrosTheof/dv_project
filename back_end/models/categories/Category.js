const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Article = mongoose.model('categories', CategorySchema);
