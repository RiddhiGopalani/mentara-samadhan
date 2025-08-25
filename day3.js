let student = {
    name: "Sakshi Chavan",
    marks: [85, 92, 78, 88, 95]  
};

let total = student.marks.reduce((sum, mark) => sum + mark, 0);

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
console.log("Marks: " + student.marks.join(", "));
console.log("Total Marks: " + total);
console.log("Average: " + average.toFixed(2));
console.log("Grade: " + grade);
