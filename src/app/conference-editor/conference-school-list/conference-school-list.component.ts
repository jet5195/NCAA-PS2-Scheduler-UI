import { Component, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Conference } from 'src/app/conference';
import { School } from 'src/app/school';
import { AddSchoolDialogComponent } from '../add-school-dialog/add-school-dialog.component';
import { Division } from "../../division";
import { ConferenceEditorService } from '../conference-editor.service';
import { CdkDragDrop, CdkDragEnter, CdkDragExit, transferArrayItem } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-conference-school-list',
  standalone: false,
  templateUrl: './conference-school-list.component.html',
  styleUrl: './conference-school-list.component.scss'
})
export class ConferenceSchoolListComponent implements OnInit {
  conference!: Conference;
  @Input() schools!: School[];
  @Input() conferences!: Conference[];
  @Input() divisions!: Division[];

  public cols: number;
  orphanedSchools: School[] = [];

  constructor(public dialog: MatDialog, private conferenceEditorService: ConferenceEditorService, private el: ElementRef, private renderer: Renderer2) {
    this.calculateColumns(window.innerWidth)
  }

  ngOnInit(): void {
    this.conferenceEditorService.selectedConference.subscribe(conference => {
      this.conference = conference;
      this.orphanedSchools = this.calculateOrphanedSchools();
      if (this.orphanedSchools.length > 0) {
        this.conferenceEditorService.updateSchoolListValidity(false);
      } else {
        this.conferenceEditorService.updateSchoolListValidity(true);
      }
    });
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
        this.moveSchool(result, division);
      }
    });
  }

  /**
   * Moves a school from its current conference to a new conference .
   * @param school - The school object to be moved to a new division.
   * @param division - The division object to which the school will be moved.
   */
  moveSchool(school: School, division?: Division) {
    //find the old Conference
    const currentConf = this.conferences.find(c => c.conferenceId === school.conferenceId);
    const currentDiv = school.divisionId ? this.divisions.find(d => d.divisionId === school.divisionId) : null;

    //set the conferenceName attribute with the new value
    school.conferenceId = this.conference.conferenceId;
    school.divisionId = division ? division.divisionId : null;

    //remove school from current conference
    currentConf.schools = currentConf.schools.filter(s => school.tgid !== s.tgid);
    if (currentDiv) {
      currentDiv.schools = currentDiv.schools.filter(s => s.tgid !== school.tgid);
    }

    //add school to new conference
    this.conference.schools.push(school);
    if (division) {
      division.schools.push(school);
    }
    // Emit an event to notify that the conference has been updated
    this.conferenceEditorService.updateSelectedConference(this.conference);
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

  calculateOrphanedSchools(): School[] {
    const orphanedSchools: School[] = [];

    // Flatten the list of schools in divisions
    const divisionSchools: School[] = this.conference.divisions.flatMap(d => d.schools);

    // Iterate through each school in the conference's schools list
    this.conference.schools.forEach(school => {
      // Check if the school is not in any division's schools list
      if (!divisionSchools.find(divisionSchool => divisionSchool.tgid === school.tgid)) {
        orphanedSchools.push(school);
      }
    });
    console.log(JSON.stringify(orphanedSchools));
    return orphanedSchools;
  }

  isDragging: boolean = false;
  dragSchool: School = null;
  activeDivision: string = null;

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.container.data.length);
    }
    this.isDragging = false;
    this.activeDivision = null;
  }

  onDragEntered(event: CdkDragEnter<any, any>) {
    this.activeDivision = event.container.id;
    // Check if the drag is entering a new container
    if (event.container.data != event.item.dropContainer.data) {
      this.isDragging = true;
      setTimeout(() => {
        this.movePlaceholderToCorrectLocation();
      }, 1);
    }
  }

  onDragExited(event: CdkDragExit<any, any>) {
    // Check if the drag is exiting the container it entered
    if (event.container.data != event.item.dropContainer.data) {
      this.isDragging = false;
    }
  }

  movePlaceholderToCorrectLocation() {
    const elementByClass = this.el.nativeElement.querySelector('.cdk-drag-placeholder');
    const targetElementById = document.getElementById('drop-location');

    if (elementByClass && targetElementById) {
      const elementRect = elementByClass.getBoundingClientRect();
      const targetRect = targetElementById.getBoundingClientRect();

      const xShift = targetRect.left - elementRect.left;
      const yShift = targetRect.top - elementRect.top;

      this.renderer.setStyle(elementByClass, 'transform', `translate(${xShift}px, ${yShift}px)`);
    }
  }
}


