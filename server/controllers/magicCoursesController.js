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
                img:req.body.img,
                title:req.body.title,
                price:req.body.price,
                description:req.body.description,
            });
            await course.save();
            res.status(201).json(course); // Changed status to 201 for resource creation
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteCourses: async (req, res) => {
        try {
            const id = req.params._id;
            const deleteCourse = await Courses.findByIdAndDelete(id);
            res.status(200).json("Program Deleted!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getCourseById: async (req, res) => {
        try {
            const id = req.params._id;
            const course = await Courses.findById(id);
            if (!course) {
                return res.status(404).json({ message: "Program not found" });
            }
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = magicCoursesController;
