const { model, Schema } = require('mongoose');

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    categories: [
        { type: Schema.Types.ObjectId, ref: 'Categories' }
    ]
});

module.exports = model('Tasks', TaskSchema);