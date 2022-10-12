const { model, Schema } = require('mongoose');

const CategorySchema = new Schema({
   name: { type: String, required: true}
}, {
    versionKey: false
});

module.exports = model('Categories', CategorySchema);