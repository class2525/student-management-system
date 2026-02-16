const Student = require("../models/studentModel");
const { validationResult } = require("express-validator");

exports.createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  await Student.create(req.body);
  res.status(201).json({ message: "Student created" });
};

exports.getStudents = async (req, res) => {
  const {
    search = "",
    sort = "id",
    order = "ASC",
    page = 1,
    limit = 10,
  } = req.query;

  const offset = (page - 1) * limit;
  const students = await Student.findAll(
    search,
    sort,
    order,
    limit,
    offset
  );

  res.json(students);
};

exports.getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: "Not found" });
  res.json(student);
};

exports.updateStudent = async (req, res) => {
  await Student.update(req.params.id, req.body);
  res.json({ message: "Updated successfully" });
};

exports.deleteStudent = async (req, res) => {
  await Student.delete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
