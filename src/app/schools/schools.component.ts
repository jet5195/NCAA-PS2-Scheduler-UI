import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { School } from '../school';
import { MatExpansionModule } from '@angular/material/expansion';
import { Conference } from '../conference';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  schools: School[] = [];
  //for optimization
  allSchools?: School[] = [];
  selectedSchool?: School;
  panelOpenState = false;
  conferences: Conference[] = [];
  selectedConference: string = "All";

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.getSchoolsByConference();
    //this.allSchools = this.schools;
    this.scheduleService.getAllConferences().subscribe((data: Conference[]) => {
      console.log(data);
      this.conferences = data;
    })
  }

  getSchoolsByConference(): void {
    if (this.allSchools!.length > 0 && this.selectedConference === 'All') {
      this.schools = this.allSchools!;
    }
    else {
      this.scheduleService.getSchoolsByConference(this.selectedConference!).subscribe((data: School[]) => {
        console.log(data);
        this.schools = data;
        if (this.selectedConference === "All"){
          this.allSchools = data;
        }
      });
    }
  }

  onSelect(school: School): void {
    this.selectedSchool = school;
  }

}
