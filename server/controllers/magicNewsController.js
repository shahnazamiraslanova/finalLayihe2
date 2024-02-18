const News = require("../models/MagicNews");

const magicNewsController = {
    getAllNews: async (req, res) => {
        try {
            const data = await News.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    postNews: async (req, res) => {
        try {
            const oneNew = new News({
                img: req.body.img,
                title: req.body.title,
                description: req.body.description,
                date: Date.now()
            });
            await oneNew.save();
            res.status(201).json(oneNew);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteNew: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedNew = await News.findByIdAndDelete(id);
            res.status(200).json("News Deleted!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getNewsById: async (req, res) => {
        try {
            const id = req.params.id;
            const idNew = await News.findById(id);
            if (!idNew) {
                return res.status(404).json({ message: "News not found" });
            }
            res.status(200).json(idNew);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateNews: async (req, res) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true }; // To return the updated document
            const updatedNews = await News.findByIdAndUpdate(id, updates, options);
            if (!updatedNews) {
                return res.status(404).json({ message: "News not found" });
            }
            res.status(200).json(updatedNews);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = magicNewsController;
