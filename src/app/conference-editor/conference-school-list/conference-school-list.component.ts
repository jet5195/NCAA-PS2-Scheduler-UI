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

  moveSchoolToDivision(school: School, division: Division) {
    const currentConfName: string = school.conferenceName;
    const currentConf: Conference = this.conferences.find(c => c.name === currentConfName);

    const currentDivName: string = school.divisionName;
    let currentDiv = null;
    if (currentDivName !== null) {
      currentDiv = this.divisions.find(d => d.name === currentDivName);
    }


    school.divisionName = division.name;

    //remove school from current conference & division
    currentConf.schools = currentConf.schools.filter(s => school.tgid !== s.tgid);
    if (currentDiv !== null) {
      currentDiv.schools = currentDiv.schools.filter(s => school.tgid !== s.tgid);
    }

    //add school to new conference & division
    this.conference.schools.push(school);
    division.schools.push(school);

    //TODO: see if this code is needed
    const index = currentConf.schools.findIndex(s => s.tgid === school.tgid);
    if (index !== -1) {
      currentConf.schools.splice(index, 1);
    }
    this.conferenceUpdated.emit(this.conference);
  }

  moveSchool(school: School) {
    const currentConfName: string = school.conferenceName;
    const currentConf: Conference = this.conferences.find(c => c.name === currentConfName);

    school.conferenceName = this.conference.shortName;

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
