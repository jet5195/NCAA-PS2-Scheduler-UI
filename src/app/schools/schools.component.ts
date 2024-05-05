import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {School} from '../school';
import {Conference} from '../conference';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  allSchools: School[] = [];
  selectedSchool?: School;
  panelOpenState = false;
  conferences: Conference[] = [];
  selectedConference?: Conference;

  constructor(
    public dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.dataService.getSchools().subscribe(data => {
      this.allSchools = data;
      this.initializeConferences();
    });
  }

  initializeConferences(): void {
    this.dataService.getConferenceList().subscribe((data: Conference[]) => {
      let allConf = {} as Conference;
      allConf.shortName = 'All';
      allConf.schools = this.allSchools;
      this.conferences = [
        allConf,
        ...data
      ];

      this.route.params.subscribe(params => {
        const confName = params['conf'];
        this.selectedConference = this.conferences.find(conference => conference.shortName === confName) || this.conferences[0];
      });
    });
  }

  findConferenceByName(name: string): Conference | undefined {
    return this.conferences.find(conference => conference.shortName === name);
  }

  onSelect(school: School): void {
    this.selectedSchool = school;
  }

  updateRoute(): void {
    if (this.selectedConference) {
      this.router.navigate(['/schools/' + this.selectedConference.shortName]);
    }
  }
}
