import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { School } from '../school';
import { AddGameRequest } from '../addGameRequest';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SchoolScheduleComponent } from '../school-schedule/school-schedule.component';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})

export class AddGameComponent implements OnInit {

  // school!: School;
  // week!: Number;
  availableOpponents: School[] = [];
  availableWeeks: number[] = [];
  selectedWeek!: number;
  selectedOpponent!: School;
  tgid!: number;
  isHomeTeam?: boolean;
  //addGameRequest!: AddGameRequest;



  constructor(private dataService: DataService, private route: ActivatedRoute, private schoolScheduleComponent: SchoolScheduleComponent) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tgid = parseInt(this.route.snapshot.paramMap.get('tgid')!, 10);
      this.dataService.getEmptyWeeks(this.tgid).subscribe((data: number[]) => {
        console.log(data);
        this.availableWeeks = data;
      })
    });
  }

  async add() {
    if (this.isHomeTeam) {
      const addGameRequest: AddGameRequest = {
        homeId: this.tgid,
        awayId: this.selectedOpponent.tgid,
        week: this.selectedWeek
      };
      await this.dataService.addGame(addGameRequest);
    }
    else if (!this.isHomeTeam) {
      const addGameRequest: AddGameRequest = {
        awayId: this.tgid,
        homeId: this.selectedOpponent.tgid,
        week: this.selectedWeek
      };
      await this.dataService.addGame(addGameRequest);
    }

    this.schoolScheduleComponent.setData()
  }

  changeWeek(): void {
    //this.selectedOpponent = undefined;
    this.dataService.getAvailableOpponents(this.tgid, this.selectedWeek).subscribe((data: School[]) => {
      console.log(data);
      this.availableOpponents = data;
    })
  }

}
