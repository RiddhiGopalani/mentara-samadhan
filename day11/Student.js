import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    age: { type: Number, min: 0 },
    course: { type: String },
    year: { type: Number, min: 1 },
    address: { type: String },
    phone: { type: String }
  },
  { timestamps: true }
);

studentSchema.index({ email: 1 }, { unique: true });

const Student = mongoose.model("Student", studentSchema);
export default Student;
