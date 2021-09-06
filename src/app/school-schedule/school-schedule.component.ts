import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Game } from '../game';
import { ScheduleService } from '../schedule.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { School } from '../school';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-school-schedule',
  templateUrl: './school-schedule.component.html',
  styleUrls: ['./school-schedule.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SchoolScheduleComponent implements OnInit {
  school!: School;
  clickedRow?: Game;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  schedule: Game[] = [];
  activatedRoute = new ActivatedRoute;
  tgid = new Number;

  displayedColumns: string[] = ['game', 'week', 'opponent', 'conferenceGame'];
  dataSource = new MatTableDataSource(this.schedule);
  expandedGame: Game | null | undefined;

  constructor(private scheduleService: ScheduleService, private route: ActivatedRoute) { }

  async delete(game: Game) {
    this.schedule = this.schedule.filter(g => g !== game);
    await this.scheduleService.deleteGame(this.school.tgid, game.week);
    // await sleep(1000);
    this.setData();
    //this.dataSource.setData(this.displayedColumns);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.setData();
    });
    this.setData();
  }

  setData(): void {
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
