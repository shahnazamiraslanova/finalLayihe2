const Programs = require("../models/MagicPrograms");

const magicProgramController = {
    getAllPrograms: async (req, res) => {
        try {
            const data = await Programs.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    postProgram: async (req, res) => {
        try {
            const program = new Programs({
                description: req.body.description,
                img: req.body.img,
                title: req.body.title
            });
            await program.save();
            res.status(201).json(program); // Changed status to 201 for resource creation
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteProgram: async (req, res) => {
        try {
            const id = req.params.id;
            const deleteProgram = await Programs.findByIdAndDelete(id);
            res.status(200).json("Program Deleted!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getProgramById: async (req, res) => {
        try {
            const id = req.params.id;
            const program = await Programs.findById(id);
            if (!program) {
                return res.status(404).json({ message: "Program not found" });
            }
            res.status(200).json(program);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = magicProgramController;
