import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Conference } from '../conference';
import { ConferenceService } from '../conference.service';
import { ScheduleService } from '../schedule.service';
import { School } from '../school';
import { ConferenceComponent } from '../conference/conference.component';

@Component({
  selector: 'app-edit-conferences',
  templateUrl: './edit-conferences.component.html',
  styleUrls: ['./edit-conferences.component.css']
})
export class EditConferencesComponent implements OnInit {
  conferences: Conference[] = [];
  schools: School[] = [];

  @ViewChildren(ConferenceComponent) children!: QueryList<ConferenceComponent>;

  constructor(private scheduleService: ScheduleService, private conferenceService: ConferenceService) { }

  ngOnInit(): void {
    this.scheduleService.getAllConferences().subscribe((data: Conference[]) => {
      console.log(data);
      this.conferences = data;
    });
    this.scheduleService.getSchools().subscribe((data: School[]) => {
      console.log(data);
      this.schools = data;
    });
  }

  getSchoolsByConference(conference: string): School[] {
    var schools!: School[];
      this.scheduleService.getSchoolsByConference(conference).subscribe((data: School[]) => {
        console.log(data);
        schools = data;
      });
      return schools;
  }

  onUpdated(updated: boolean) {
    this.children.forEach(child => {
      child.loadSchools();
    });
  }

}
