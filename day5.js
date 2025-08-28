const express = require("express");
const app = express();


const students = [
  { id: 1, name: "Sakshi", age: 20, course: "Computer Science" },
  { id: 2, name: "Riddhi", age: 22, course: "Mechanical Engineering" },
  { id: 3, name: "Tia", age: 21, course: "Electrical Engineering" },
  { id: 4, name: "Harsh", age: 23, course: "Civil Engineering" }
];

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
