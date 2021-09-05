import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Game } from '../game';
import { ScheduleService } from '../schedule.service';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { School } from '../school';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-schedule',
  templateUrl: './school-schedule.component.html',
  styleUrls: ['./school-schedule.component.css']
})
export class SchoolScheduleComponent implements OnInit {
  school?: School;
  clickedRow?: Game;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  schedule: Game[] = [];

  displayedColumns: string[] = ['week', 'homeTeam', 'awayTeam', 'conferenceGame'];
  dataSource = new MatTableDataSource(this.schedule);

  constructor(private scheduleService: ScheduleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const tgid = parseInt(this.route.snapshot.paramMap.get('tgid')!, 10);
    this.scheduleService.getSchoolByTgid(tgid).subscribe((data: School) => {
      console.log(data);
      this.school = data;
    })
    this.scheduleService.getSchoolSchedule(tgid).subscribe((data: Game[]) => {
      console.log(data);
      this.schedule = data;
      this.dataSource = new MatTableDataSource(this.schedule);
      this.dataSource.sort = this.sort;
    })
  }

  

}
