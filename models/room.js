const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    password: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now }, //For cleanup, perhaps delete room after 1 day?
})

module.exports = mongoose.model('Room', roomSchema);