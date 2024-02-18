const Admin = require('../models/MagicAdmins');

const adminController = {
    getAllAdmins: async (req, res) => {
        try {
            const admins = await Admin.find();
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAdminById: async (req, res) => {
        try {
            const admin = await Admin.findById(req.params.id);
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }
            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createAdmin: async (req, res) => {
        try {
            const admin = new Admin(req.body);
            await admin.save();
            res.status(201).json(admin);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateAdmin: async (req, res) => {
        try {
            const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }
            res.status(200).json(admin);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteAdmin: async (req, res) => {
        try {
            const admin = await Admin.findByIdAndDelete(req.params.id);
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }
            res.status(200).json({ message: "Admin deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = adminController;
