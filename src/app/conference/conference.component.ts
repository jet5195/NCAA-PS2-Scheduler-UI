import { Component, Input, OnInit } from '@angular/core';
import { Conference } from '../conference';
import { ConferenceService } from '../conference.service';
import { ScheduleService } from '../schedule.service';
import { School } from '../school';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {
  
  @Input() conference!: Conference;

  confSchools: School[] = [];
  divSchools: School[][] = [];

  drop(event: CdkDragDrop<School[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  constructor(private scheduleService: ScheduleService, private conferenceService: ConferenceService) { }

  ngOnInit(): void {
    if(this.conference.divisions !== null){
        this.getSchoolsByDivision();
    }
    else {
      this.getSchoolsByConference();
    }
  }

  getSchoolsByConference(): void {
      this.scheduleService.getSchoolsByConference(this.conference.name).subscribe((data: School[]) => {
        console.log(data);
        this.confSchools = data;
      });
  }

  getSchoolsByDivision(): void {
    this.conferenceService.getSchoolsByDivision(this.conference.name, this.conference.divisions[0]).subscribe((data: School[]) => {
      console.log(data);
      this.divSchools[0] = data;
    });
    this.conferenceService.getSchoolsByDivision(this.conference.name, this.conference.divisions[1]).subscribe((data: School[]) => {
      console.log(data);
      this.divSchools[1] = data;
    });
}

}
