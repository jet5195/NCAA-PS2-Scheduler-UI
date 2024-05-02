import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conference } from 'src/app/conference';
import { School } from 'src/app/school';

@Component({
  selector: 'app-add-school-dialog',
  standalone: false,
  templateUrl: './add-school-dialog.component.html',
  styleUrl: './add-school-dialog.component.scss'
})
export class AddSchoolDialogComponent {
  availableSchools: School[];
  conference: Conference;
  selectedSchool: School;

  constructor(
    public dialogRef: MatDialogRef<AddSchoolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.availableSchools = data.availableSchools;
  }

  filteredSchools: School[] = [];

  filterSchools(event) {
    const searchValue = event.value;
    if (!searchValue) {
      this.filteredSchools = this.availableSchools;
    } else {
      this.filteredSchools = this.availableSchools.filter(school =>
        school.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }

  ngOnInit() {
    this.filteredSchools = this.availableSchools; // Initialize filtered schools
  }

}