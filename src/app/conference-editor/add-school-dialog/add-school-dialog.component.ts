import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { Conference } from 'src/app/conference';
import { School } from 'src/app/school';

@Component({
  selector: 'app-add-school-dialog',
  templateUrl: './add-school-dialog.component.html',
  styleUrl: './add-school-dialog.component.scss',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatInput,
    MatOption,
    NgFor,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class AddSchoolDialogComponent {
  availableSchools: School[];
  conference: Conference;
  selectedSchool: School;

  constructor(
    public dialogRef: MatDialogRef<AddSchoolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.availableSchools = data.availableSchools;
  }

  filteredSchools: School[] = [];

  filterSchools(event) {
    const searchValue = event.value;
    if (!searchValue) {
      this.filteredSchools = this.availableSchools;
    } else {
      this.filteredSchools = this.availableSchools.filter((school) =>
        school.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }
  }

  ngOnInit() {
    this.filteredSchools = this.availableSchools; // Initialize filtered schools
  }
}
