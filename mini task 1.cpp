#include <iostream>
using namespace std;

class Student {
private:
    string name;
    int rollNo;
    float marks;
public:
    Student(string n, int r, float m) {
        name = n;
        rollNo = r;
        marks = m;
    }
    void printDetails() {
        cout << "Student Details:" << endl;
        cout << "Name: " << name << endl;
        cout << "Roll No: " << rollNo << endl;
        cout << "Marks: " << marks << endl;
    }
};
int main(){

    Student s1("Sakshi", 101, 92.5);
    s1.printDetails();

    return 0;
}
