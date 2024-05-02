import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Conference } from 'src/app/conference';
import { School } from 'src/app/school';
import { AddSchoolDialogComponent } from '../add-school-dialog/add-school-dialog.component';

@Component({
  selector: 'app-conference-school-list',
  standalone: false,
  templateUrl: './conference-school-list.component.html',
  styleUrl: './conference-school-list.component.scss'
})
export class ConferenceSchoolListComponent {
  @Input() conference!: Conference;
  @Input() schools!: School[];
  @Input() conferences!: Conference[];

  constructor(public dialog: MatDialog) {

  }

  @Output() conferenceUpdated = new EventEmitter<Conference>();

  openAddSchoolDialog() {
    const dialogRef = this.dialog.open(AddSchoolDialogComponent, {
      width: '250px',
      data: {
        availableSchools: this.schools.filter(school =>
          !this.conference.schools.some(confSchool =>
            confSchool.tgid === school.tgid))
      } // Pass the list of schools
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result != 'canceled') {
        this.moveSchool(result);
      }
    });
  }

  moveSchool(school: School) {
    const currentConfName: string = school.conferenceName;
    const currentConf: Conference = this.conferences.find(c => c.name === currentConfName);

    school.conferenceName = this.conference.name;

    currentConf.schools = currentConf.schools.filter(s => school.tgid !== s.tgid);
    this.conference.schools.push(school);
    const index = currentConf.schools.findIndex(s => s.tgid === school.tgid);
    if (index !== -1) {
      currentConf.schools.splice(index, 1);
    }
    this.conferenceUpdated.emit(this.conference);
  }

  isDark(color: string): boolean {
    if (color) {
      const rgb = parseInt(color.slice(1), 16); // Convert hex to integer
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      // Calculate brightness
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128; // True if dark background
    }
    return false;
  }

}
