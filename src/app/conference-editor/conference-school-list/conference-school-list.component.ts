import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Conference } from 'src/app/conference';
import { School } from 'src/app/school';
import { AddSchoolDialogComponent } from '../add-school-dialog/add-school-dialog.component';

@Component({
  selector: 'app-conference-school-list',
  standalone: false,
  templateUrl: './conference-school-list.component.html',
  styleUrl: './conference-school-list.component.css'
})
export class ConferenceSchoolListComponent {
  @Input() conference!: Conference;
  @Input() conferenceSchools!: School[];
  @Input() schools!: School[];

  constructor(public dialog: MatDialog){

  }

  openAddSchoolDialog() {
    const dialogRef = this.dialog.open(AddSchoolDialogComponent, {
      width: '250px',
      data: { availableSchools: this.schools } // Pass the list of schools
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result != 'canceled'){
        this.conferenceSchools.push(result);
      }
    });
  }

  isDark(color: string): boolean {
    if(color){
      const rgb = parseInt(color.slice(1), 16); // Convert hex to integer
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >>  8) & 0xff;
      const b = (rgb >>  0) & 0xff;
    
      // Calculate brightness
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128; // True if dark background
    }
    return false;
  }
  
}
