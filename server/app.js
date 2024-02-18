const express = require("express");
const cors = require("cors");
const PORT = 8080;
const mongoose = require("mongoose");
const magicNewsController = require("./controllers/magicNewsController");
const magicTeachersController = require("./controllers/magicTeachersController");
const magicProgramController = require("./controllers/magicProgramController");
const magicCoursesController = require("./controllers/magicCoursesController");
const magicContactController = require("./controllers/magicContactController");
const adminController = require("./controllers/magicAsminsController"); 
const userController = require("./controllers/magicUserController");
const app = express();
app.use(cors());
app.use(express.json());
const DB_URL = "mongodb+srv://shahnaz:shahnaz2003@cluster0.lz0xwlb.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL)
    .then(() => console.log("Connected to MongoDB!"))
    .catch(error => console.error("Connection error:", error));

// News routes
app.get("/news", magicNewsController.getAllNews);
app.post("/news", magicNewsController.postNews);
app.delete("/news/:id", magicNewsController.deleteNew);
app.get("/news/:id", magicNewsController.getNewsById);
app.put("/news/:id", magicNewsController.updateNews); 

// Teachers routes
app.get("/teachers", magicTeachersController.getAllTeachers);
app.post("/teachers", magicTeachersController.postTeacher);
app.delete("/teachers/:id", magicTeachersController.deleteTeachers);
app.get("/teachers/:id", magicTeachersController.getTeacherById);
app.put("/teachers/:id", magicTeachersController.updateTeacher);

// Programs routes
app.get("/programs", magicProgramController.getAllPrograms);
app.post("/programs", magicProgramController.postProgram);
app.delete("/programs/:id", magicProgramController.deleteProgram);
app.get("/programs/:id", magicProgramController.getProgramById);
app.put("/programs/:id", magicProgramController.updateProgram); 

// Courses routes
app.get("/courses", magicCoursesController.getAllCourses);
app.post("/courses", magicCoursesController.postCourse);
app.delete("/courses/:id", magicCoursesController.deleteCourses);
app.get("/courses/:id", magicCoursesController.getCourseById);
app.put("/courses/:id", magicCoursesController.updateCourse); 

// Contacts routes
app.get("/contacts", magicContactController.getAllContact);
app.post("/contacts", magicContactController.postContact);
app.delete("/contacts/:id", magicContactController.deleteContact);
app.get("/contacts/:id", magicContactController.getContactById);
app.put("/contacts/:id", magicContactController.updateContact); 

// Admin routes
app.get("/admins", adminController.getAllAdmins);
app.post("/admins", adminController.createAdmin);
app.delete("/admins/:id", adminController.deleteAdmin);
app.put("/admins/:id", adminController.updateAdmin); 


// User routes
app.get("/users", userController.getAllUsers);
app.post("/users", userController.createUser);
app.delete("/users/:id", userController.deleteUser);
app.put("/users/:id", userController.updateUser); 
app.listen(PORT, () => {
    console.log("Your App is running on port", PORT);
});
