import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { School } from '../school';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  schools: School[] = [];
  selectedSchool?: School;
  panelOpenState = false;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.scheduleService.getSchools().subscribe((data: School[]) => {
      console.log(data);
      this.schools = data;
    })
  }

  onSelect(school: School): void {
    this.selectedSchool = school;
  }

}
