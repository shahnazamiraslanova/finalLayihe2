const mongoose = require('mongoose');

const MagicNewsSchema = mongoose.Schema({
    img: String,
    title: String,
    description: String,
    date: { type: Date, default: Date.now } // Automatically set to the current date
});

module.exports = mongoose.model("news", MagicNewsSchema);
