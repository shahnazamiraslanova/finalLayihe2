const Contacts = require("../models/MagicContact");

const magicContactController = {
    getAllContact: async (req, res) => {
        try {
            const data = await Contacts.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    postContact: async (req, res) => {
        try {
            const contact = new Teachers({
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                number: req.body.number,
                message: req.body.message,

            });
            await contact.save();
            res.status(201).json(contact); // Changed status to 201 for resource creation
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteContact: async (req, res) => {
        try {
            const id = req.params.id;
            const deleteContact = await Contacts.findByIdAndDelete(id);
            res.status(200).json("Contact Deleted!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getContactById: async (req, res) => {
        try {
            const id = req.params.id;
            const contact = await Contacts.findById(id);
            if (!contact) {
                return res.status(404).json({ message: "Teacher not found" });
            }
            res.status(200).json(contact);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = magicContactController;
