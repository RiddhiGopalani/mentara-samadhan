#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter number of students: ";
    cin >> n;

    int marks[n];

    cout << "Enter marks of students: ";
    for (int i = 0; i < n; i++) {
        cin >> marks[i];
    }

    int highest = marks[0];

    for (int i = 1; i < n; i++) {
        if (marks[i] > highest) {
            highest = marks[i];
        }
    }

    cout << "Highest marks = " << highest << endl;

    return 0;
}
