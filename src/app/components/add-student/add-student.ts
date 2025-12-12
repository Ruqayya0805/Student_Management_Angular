import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css'
})
export class AddStudentComponent {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private router = inject(Router);

  studentForm: FormGroup;
  
  classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9'];
  subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science'];

  constructor() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      class: ['', Validators.required],
      gender: ['', Validators.required],
      hasHobby: [false],
      hobby: [''],
      favoriteSubject: ['']
    });

    
    this.studentForm.get('hasHobby')?.valueChanges.subscribe(hasHobby => {
      const hobbyControl = this.studentForm.get('hobby');
      if (hasHobby) {
        hobbyControl?.setValidators([Validators.required]);
      } else {
        hobbyControl?.clearValidators();
        hobbyControl?.setValue('');
      }
      hobbyControl?.updateValueAndValidity();
    });
  }

  get name() {
    return this.studentForm.get('name');
  }

  get selectedClass() {
    return this.studentForm.get('class')?.value;
  }

  get hasHobby() {
    return this.studentForm.get('hasHobby')?.value;
  }

  getClassMessage(): string {
    const classValue = this.selectedClass;
    if (classValue === 'Class 9') {
      return 'You will appear in board exams soon. All the Best !!';
    } else if (classValue === 'Class 6') {
      return 'Welcome to middle school!';
    } else if (classValue) {
      return 'Education and hobby go hand in hand!';
    }
    return '';
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const formValue = this.studentForm.value;
      this.studentService.addStudent({
        name: formValue.name,
        class: formValue.class,
        gender: formValue.gender,
        hasHobby: formValue.hasHobby,
        hobby: formValue.hasHobby ? formValue.hobby : '',
        favoriteSubject: formValue.favoriteSubject
      });
      
      this.router.navigate(['/home']);
    } else {
      
      Object.keys(this.studentForm.controls).forEach(key => {
        this.studentForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }
}