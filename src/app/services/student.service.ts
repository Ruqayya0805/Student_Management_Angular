import { Injectable, signal } from '@angular/core';
import { Student } from '../models/studentmodel';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsSignal = signal<Student[]>([
    {
      id: 1,
      name: 'Rahul Sharma',
      class: 'Class 8',
      gender: 'Male',
      hasHobby: true,
      hobby: 'Cricket',
      favoriteSubject: 'Mathematics'
    },
    {
      id: 2,
      name: 'Priya Patel',
      class: 'Class 9',
      gender: 'Female',
      hasHobby: false,
      hobby: '',
      favoriteSubject: 'Science'
    }
  ]);

  students = this.studentsSignal.asReadonly();

  addStudent(student: Omit<Student, 'id'>): void {
    const newStudent: Student = {
      ...student,
      id: this.getNextId()
    };
    this.studentsSignal.update(students => [...students, newStudent]);
  }

  private getNextId(): number {
    const students = this.studentsSignal();
    return students.length > 0 
      ? Math.max(...students.map(s => s.id)) + 1 
      : 1;
  }
}