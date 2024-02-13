const mongoose = require('mongoose');

const MagicNewsSchema = mongoose.Schema({
    img: String,
    title: String,
    description: String,
});

module.exports = mongoose.model("news", MagicNewsSchema);
