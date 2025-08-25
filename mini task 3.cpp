#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter number of subjects: ";
    cin >> n;

    int marks[n];
    int total = 0;

    cout << "Enter marks of " << n << " subjects: ";
    for (int i = 0; i < n; i++) {
        cin >> marks[i];
        total += marks[i];
    }

    float average = (float)total / n;
    float percentage = ((float)total / (n * 100)) * 100; // assuming each subject is out of 100

    cout << "\n---- Result ----" << endl;
    cout << "Total Marks: " << total << endl;
    cout << "Average Marks: " << average << endl;
    cout << "Percentage: " << percentage << "%" << endl;

    return 0;
}
