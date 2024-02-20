const mongoose = require('mongoose');

const MagicUsersSchema = mongoose.Schema({
    name: String,
    lastName: String,
    username: { type: String, unique: true }, 
    email: { type: String, unique: true }, 
    password: String,
    favs: { type: Object }, 
    cart: { type: Object } 
});

module.exports = mongoose.model("users", MagicUsersSchema);
