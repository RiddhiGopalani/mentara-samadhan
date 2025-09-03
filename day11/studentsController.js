import Student from "../models/Student.js";
import Joi from "joi";
import mongoose from "mongoose";

const studentSchema = Joi.object({
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().allow("", null),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).max(150),
  course: Joi.string().allow("", null),
  year: Joi.number().integer().min(1).max(10),
  address: Joi.string().allow("", null),
  phone: Joi.string().allow("", null)
});

export async function createStudent(req, res, next) {
  try {
    const { error, value } = studentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const exists = await Student.findOne({ email: value.email });
    if (exists) return res.status(409).json({ error: "Email already in use" });

    const student = await Student.create(value);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
}

export async function getStudents(req, res, next) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const filters = {};
    if (req.query.course) filters.course = req.query.course;

    const [total, students] = await Promise.all([
      Student.countDocuments(filters),
      Student.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit)
    ]);

    res.json({
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
      data: students
    });
  } catch (err) {
    next(err);
  }
}

export async function getStudentById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid id" });

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
  } catch (err) {
    next(err);
  }
}

export async function updateStudent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid id" });

    const { error, value } = studentSchema.validate(req.body, { presence: "optional" });
    if (error) return res.status(400).json({ error: error.details[0].message });

    if (value.email) {
      const other = await Student.findOne({ email: value.email, _id: { $ne: id } });
      if (other) return res.status(409).json({ error: "Email already in use" });
    }

    const student = await Student.findByIdAndUpdate(id, value, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
  } catch (err) {
    next(err);
  }
}

export async function deleteStudent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid id" });

    const student = await Student.findByIdAndDelete(id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json({ message: "Student deleted" });
  } catch (err) {
    next(err);
  }
}
