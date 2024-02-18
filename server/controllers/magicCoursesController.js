const Courses = require("../models/MagicCourses");

const magicCoursesController = {
    getAllCourses: async (req, res) => {
        try {
            const data = await Courses.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    postCourse: async (req, res) => {
        try {
            const course = new Courses({
                img: req.body.img,
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
            });
            await course.save();
            res.status(201).json(course);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteCourses: async (req, res) => {
        try {
            const id = req.params.id;
            const deleteCourse = await Courses.findByIdAndDelete(id);
            res.status(200).json("Program Deleted!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getCourseById: async (req, res) => {
        try {
            const id = req.params.id;
            const course = await Courses.findById(id);
            if (!course) {
                return res.status(404).json({ message: "Program not found" });
            }
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateCourse: async (req, res) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true }; // To return the updated document
            const updatedCourse = await Courses.findByIdAndUpdate(id, updates, options);
            if (!updatedCourse) {
                return res.status(404).json({ message: "Course not found" });
            }
            res.status(200).json(updatedCourse);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = magicCoursesController;
