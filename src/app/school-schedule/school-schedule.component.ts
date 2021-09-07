import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Game } from '../game';
import { ScheduleService } from '../schedule.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { School } from '../school';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddGameRequest } from '../addGameRequest';


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
// @Injectable({
//   providedIn: 'root' // just before your class
// })
export class SchoolScheduleComponent implements OnInit {
  school!: School;
  clickedRow?: Game;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  schedule: Game[] = [];
  activatedRoute = new ActivatedRoute;
  tgid!: number;

  selectedOpponent!: School;
  selectedWeek!: number;
  availableOpponents: School[] = [];
  availableWeeks: number[] = [];
  isHomeTeam!: boolean;

  displayedColumns: string[] = ['game', 'week', 'opponent', 'conferenceGame'];
  dataSource = new MatTableDataSource(this.schedule);
  expandedGame: Game | null | undefined;

  constructor(private scheduleService: ScheduleService, private route: ActivatedRoute) { }

  async add() {

    if (this.isHomeTeam === true) {
      const addGameRequest: AddGameRequest = {
        homeId: this.tgid,
        awayId: this.selectedOpponent.tgid,
        week: this.selectedWeek
      };
      await this.scheduleService.addGame(addGameRequest);
    }
    else if (this.isHomeTeam === false) {
      const addGameRequest: AddGameRequest = {
        homeId: this.selectedOpponent.tgid,
        awayId: this.tgid,
        week: this.selectedWeek
      };
      await this.scheduleService.addGame(addGameRequest);
    }
    this.setData()
    this.setAddGameData();
  }

  async delete(game: Game) {
    this.schedule = this.schedule.filter(g => g !== game);
    await this.scheduleService.deleteGame(this.school.tgid, game.week);
    // await sleep(1000);
    this.setData();
    this.setAddGameData();
    //this.dataSource.setData(this.displayedColumns);
  }

  changeWeek(): void {
    //this.selectedOpponent = undefined;
    this.scheduleService.getAvailableOpponents(this.tgid, this.selectedWeek).subscribe((data: School[]) => {
      console.log(data);
      this.availableOpponents = data;
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      this.setData();
      this.setAddGameData();
    });
    //this.setData();
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

  setAddGameData(): void {
    this.tgid = parseInt(this.route.snapshot.paramMap.get('tgid')!, 10);
      this.scheduleService.getEmptyWeeks(this.tgid).subscribe((data: number[]) => {
        console.log(data);
        this.availableWeeks = data;
      })
  }

  

}
