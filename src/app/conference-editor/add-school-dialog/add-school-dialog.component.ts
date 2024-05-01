import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { School } from 'src/app/school';

@Component({
  selector: 'app-add-school-dialog',
  standalone: false,
  templateUrl: './add-school-dialog.component.html',
  styleUrl: './add-school-dialog.component.css'
})
export class AddSchoolDialogComponent {
  availableSchools: School[]; // Replace School with your actual school type
  selectedSchool: School;

  constructor(
    public dialogRef: MatDialogRef<AddSchoolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.availableSchools = data.availableSchools;
  }
}