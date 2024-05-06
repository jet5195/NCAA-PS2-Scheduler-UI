import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Conference} from 'src/app/conference';
import {School} from 'src/app/school';
import {AddSchoolDialogComponent} from '../add-school-dialog/add-school-dialog.component';
import {Division} from "../../division";

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
  @Input() divisions!: Division[];
  @Output() conferenceUpdated: EventEmitter<Conference> = new EventEmitter<Conference>();

  public cols: number;

  constructor(public dialog: MatDialog) {
    this.calculateColumns(window.innerWidth)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.calculateColumns(event.target['innerWidth']);
  }

  calculateColumns(innerWidth: any) {
    if (innerWidth < 850) {
      this.cols = 1;
    } else if (innerWidth < 1200) {
      this.cols = 2;
    } else if (innerWidth <= 1600) {
      this.cols = 3;
    } else {
      this.cols = 4;
    }
  }


  openAddSchoolDialog(division?: Division) {
    const dialogRef: MatDialogRef<AddSchoolDialogComponent> = this.dialog.open(AddSchoolDialogComponent, {
      width: '250px',
      data: {
        availableSchools: this.schools.filter(school =>
          !this.conference.schools.some(confSchool =>
            confSchool.tgid === school.tgid))
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result != 'canceled') {
        if (division) {
          this.moveSchoolToDivision(result, division);
        }
        this.moveSchool(result);
      }
    });
  }

  /**
   * Moves a school from its current conference to a new conference and division.
   * @param school - The school object to be moved to a new division.
   * @param division - The division object to which the school will be moved.
   */
  moveSchoolToDivision(school: School, division: Division) {
    // Find the old Conference and Division
    const currentConf = this.conferences.find(c => c.name === school.conferenceName);
    const currentDiv = school.divisionName ? this.divisions.find(d => d.name === school.divisionName) : null;

    // Set the conferenceName & divisionName attributes with the new values
    school.conferenceName = this.conference.shortName;
    school.divisionName = division.name;

    // Remove school from current conference & division
    currentConf.schools = currentConf.schools.filter(s => s.tgid !== school.tgid);
    if (currentDiv) {
      currentDiv.schools = currentDiv.schools.filter(s => s.tgid !== school.tgid);
    }

    // Add school to new conference & division
    this.conference.schools.push(school);
    division.schools.push(school);

    // Emit an event to notify that the conference has been updated
    this.conferenceUpdated.emit(this.conference);
  }

  /**
   * Moves a school from its current conference to a new conference .
   * @param school - The school object to be moved to a new division.
   * @param division - The division object to which the school will be moved.
   */
  moveSchool(school: School) {
    //find the old Conference
    const currentConf = this.conferences.find(c => c.name === school.conferenceName);

    //set the conferenceName attribute with the new value
    school.conferenceName = this.conference.shortName;

    //remove school from current conference
    currentConf.schools = currentConf.schools.filter(s => school.tgid !== s.tgid);

    //add school to new conference
    this.conference.schools.push(school);

    // Emit an event to notify that the conference has been updated
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
