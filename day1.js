let student = {
    name: "Sakshi Chavan",
    age: 21,
    rollNo: 45,
    course: "Computer Science"
};

console.log("Name: " + student.name);
console.log("Age: " + student.age);
console.log("Roll No: " + student.rollNo);
console.log("Course: " + student.course);

console.log("\nStudent details are as follows: ");
for (let key in student) {
    console.log(key + ": " + student[key]);
}

