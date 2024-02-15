const express = require("express");
const cors = require("cors");
const PORT = 8080;
const mongoose = require("mongoose");
const magicNewsController = require("./controllers/magicNewsController");
const magicTeachersController = require("./controllers/magicTeachersController");
const magicProgramController = require("./controllers/magicProgramController");
const magicCoursesController = require("./controllers/magicCoursesController");
const magicContactController = require("./controllers/magicContactController");
const app = express();
app.use(cors());
app.use(express.json());
const DB_URL = "mongodb+srv://shahnaz:shahnaz2003@cluster0.lz0xwlb.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL)
    .then(() => console.log("Connected to MongoDB!"))
    .catch(error => console.error("Connection error:", error));

app.get("/news", magicNewsController.getAllNews);
app.post("/news", magicNewsController.postNews);
app.delete("/news/:id", magicNewsController.deleteNew);
app.get("/news/:id", magicNewsController.getNewsById); // Added route for findById

app.get("/teachers", magicTeachersController.getAllTeachers);
app.post("/teachers", magicTeachersController.postTeacher);
app.delete("/teachers/:id", magicTeachersController.deleteTeachers);
app.get("/teachers/:id", magicTeachersController.getTeacherById);

app.get("/programs", magicProgramController.getAllPrograms);
app.post("/programs", magicProgramController.postProgram);
app.delete("/programs/:id", magicProgramController.deleteProgram);
app.get("/programs/:id", magicProgramController.getProgramById);

app.get("/courses", magicCoursesController.getAllCourses);
app.post("/courses", magicCoursesController.postCourse);
app.delete("/courses/:id", magicCoursesController.deleteCourses);
app.get("/courses/:id", magicCoursesController.getCourseById);


app.get("/contacts", magicContactController.getAllContact);
app.post("/contacts", magicContactController.postContact);
app.delete("/contacts/:id", magicContactController.deleteContact);
app.get("/contacts/:id", magicContactController.getContactById);

app.listen(PORT, () => {
    console.log("Your App is running on port", PORT);
});
