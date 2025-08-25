let student = {
    name: "Riddhi Gopalani",
    marks: [85, 92, 98, 88, 95]
};

let total = 0;
for (let i = 0; i < student.marks.length; i++) {
    total = total + student.marks[i];
}

let average = total / student.marks.length;

let grade;
if (average >= 90) {
    grade = "A+";
} else if (average >= 80) {
    grade = "A";
} else if (average >= 70) {
    grade = "B";
} else if (average >= 60) {
    grade = "C";
} else {
    grade = "Fail";
}

console.log("Student Name: " + student.name);
console.log("Marks: " + student.marks);
console.log("Total Marks: " + total);
console.log("Average: " + average);
console.log("Grade: " + grade);
