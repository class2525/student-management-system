const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentController");
const { studentValidation } = require("../validators/studentValidator");

router.post("/", studentValidation, controller.createStudent);
router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentById);
router.put("/:id", studentValidation, controller.updateStudent);
router.delete("/:id", controller.deleteStudent);

module.exports = router;
