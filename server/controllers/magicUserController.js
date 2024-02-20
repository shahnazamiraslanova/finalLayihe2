const User = require("../models/MagicUsers");

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const { name, lastName, email, username, password, favs, cart } = req.body;
            const user = new User({ name, lastName, email, username, password, favs, cart });
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const updates = req.body;
            const options = { new: true }; // To return the updated document
            const updatedUser = await User.findByIdAndUpdate(userId, updates, options);
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = userController;
