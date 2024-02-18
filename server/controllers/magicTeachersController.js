const Teachers = require("../models/MagicTeachers");

const magicTeachersController = {
    getAllTeachers: async (req, res) => {
        try {
            const data = await Teachers.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    postTeacher: async (req, res) => {
        try {
            const teacher = new Teachers({
                img: req.body.img,
                name: req.body.name,
                subject: req.body.subject,
                experience: req.body.experience,
                description: req.body.description,
            });
            await teacher.save();
            res.status(201).json(teacher);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteTeachers: async (req, res) => {
        try {
            const id = req.params.id;
            const deleteTeacher = await Teachers.findByIdAndDelete(id);
            res.status(200).json("Teacher Deleted!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getTeacherById: async (req, res) => {
        try {
            const id = req.params.id;
            const teacher = await Teachers.findById(id);
            if (!teacher) {
                return res.status(404).json({ message: "Teacher not found" });
            }
            res.status(200).json(teacher);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateTeacher: async (req, res) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true }; // To return the updated document
            const updatedTeacher = await Teachers.findByIdAndUpdate(id, updates, options);
            if (!updatedTeacher) {
                return res.status(404).json({ message: "Teacher not found" });
            }
            res.status(200).json(updatedTeacher);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = magicTeachersController;
