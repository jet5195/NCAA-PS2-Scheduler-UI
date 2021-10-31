import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { School } from '../school';
import { Conference } from '../conference';
import { ActivatedRoute, Router} from '@angular/router';

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

  constructor(private scheduleService: ScheduleService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedConference = params['conf'];
      this.getSchoolsByConference();
      //this.allSchools = this.schools;
      this.scheduleService.getAllConferences().subscribe((data: Conference[]) => {
        console.log(data);
        this.conferences = data;
      });
    });
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

  updateRoute() {
    this.router.navigate(['/schools/' + this.selectedConference]);
  }

}
