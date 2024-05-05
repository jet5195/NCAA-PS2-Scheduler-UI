import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Game } from '../game';
import { Location } from '@angular/common';
import { School } from '../school';
import { MinutesAfterMidnightToTimePipe } from '../pipes/minutesAfterMidnightToTime.pipe';
import { DayOfWeekToStringPipe } from '../pipes/dayOfWeekToString.pipe';
import { AddGameRequest } from '../addGameRequest';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CompareService } from '../services/compare.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  gameFormGroup!: FormGroup
  game!: Game;
  gameTime!: string;
  gameDay!: any;
  week!: number;
  gameNumber!: number;
  availableHomeSchools!: School[];
  availableAwaySchools!: School[];
  initialHomeTeam!: School;
  initialAwayTeam!: School;
  homeTeam!: School;
  awayTeam!: School;
  is5Sat!: boolean;
  dayList!: any[];
  emptyWeeks!: number[];
  gameWeek!: number;
  validate: boolean = true;

  constructor(private data: DataService, private route: ActivatedRoute, private location: Location,
    private mtmToTime: MinutesAfterMidnightToTimePipe, private dowToString: DayOfWeekToStringPipe,
  public compareService: CompareService) {
     }

  ngOnInit(): void {
    this.createDayList(true);
    this.route.params.subscribe(params => {
      this.week = parseInt(this.route.snapshot.paramMap.get('week')!, 10);
      this.gameNumber = parseInt(this.route.snapshot.paramMap.get('gameNumber')!, 10);
      this.loadGame();
      //if editing bowl games, don't force validation
      if(this.week > 15){
        this.validate = false;
      }
    });
  }

  createDayList(ncaa06: boolean): void  {
    if (ncaa06) {
      this.dayList = [{
        value: 'Monday',
        key: 0
      },
      {
        value: 'Tuesday',
        key: 1
      },
      {
        value: 'Wednesday',
        key: 2
      },
      {
        value: 'Thursday',
        key: 3
      },
      {
        value: 'Friday',
        key: 4
      },
      {
        value: 'Saturday',
        key: 5
      },
      {
        value: 'Sunday',
        key: 6
      }];
    } else {
      this.dayList = [{
        value: 'Monday',
        key: 4
      },
      {
        value: 'Tuesday',
        key: 5
      },
      {
        value: 'Wednesday',
        key: 6
      },
      {
        value: 'Thursday',
        key: 0
      },
      {
        value: 'Friday',
        key: 1
      },
      {
        value: 'Saturday',
        key: 2
      },
      {
        value: 'Sunday',
        key: 3
      }];
    }
  }

  getAvailableHomeSchools(): void {
    this.getEmptyWeeks();
    this.data.getAvailableOpponents(this.awayTeam.tgid, this.week).subscribe((data: School[]) => {
      console.log(data);
      this.availableHomeSchools = data;
      if (!this.availableHomeSchools.includes(this.initialHomeTeam)) {
        this.availableHomeSchools.unshift(this.initialHomeTeam);
      }
      if (!this.availableHomeSchools.includes(this.homeTeam)) {
        this.availableHomeSchools.unshift(this.homeTeam);
      }
    });
  }

  getEmptyWeeks(): void {
    this.data.getEmptyWeeksTwoTeams(this.awayTeam.tgid, this.homeTeam.tgid).subscribe((data: number[]) => {
      console.log(data);
      this.emptyWeeks = data;
      this.emptyWeeks.unshift(this.gameWeek);
    });
  }

  setListsToAllSchools(): void {
    this.data.getSchools().subscribe((data: School[]) => {
      this.availableAwaySchools = data;
      this.availableHomeSchools = data;
    });
  }

  getAvailableAwaySchools(): void {
    if (this.validate) {
      this.getEmptyWeeks();
      this.data.getAvailableOpponents(this.homeTeam.tgid, this.week).subscribe((data: School[]) => {
        console.log(data);
        this.availableAwaySchools = data;
        if (!this.availableAwaySchools.includes(this.initialAwayTeam)) {
          this.availableAwaySchools.unshift(this.initialAwayTeam);
        }
        if (!this.availableAwaySchools.includes(this.awayTeam)) {
          this.availableAwaySchools.unshift(this.awayTeam);
        }
      });
    } else {
      this.setListsToAllSchools();
    }
  }

  setLists(validate: boolean): void {
    if (validate) {
      this.getAvailableHomeSchools();
      this.getAvailableAwaySchools();
      this.getEmptyWeeks();
    } else {
      this.setListsToAllSchools();
      this.emptyWeeks = this.getAllWeeks();
    }
  }

  loadGame(): void {
    this.data.getGame(this.week, this.gameNumber).subscribe((data: Game) => {
      console.log(data);
      this.game = data;
      this.gameWeek = data.week;
      this.homeTeam = data.homeTeam;
      this.awayTeam = data.awayTeam;
      this.initialHomeTeam = data.homeTeam;
      this.initialAwayTeam = data.awayTeam;
      this.setLists(this.validate);
      this.gameTime = this.mtmToTime.transform(data.time, true);
      this.gameDay = this.dayList.find(day => day.key === data.day);
    });
  }

  // async save(): Promise<void> {
  //   console.log(this.game.time);

  //   await this.data.deleteGame(this.game.homeTeam.tgid, this.game.week);

  //   this.game.homeTeam = this.homeTeam;
  //   this.game.awayTeam = this.awayTeam;
  //   this.game.time = this.timeToMinutesAfterMidnight();
  //   this.game.day = this.gameDay.key;

  //   const addGameRequest: AddGameRequest = {
  //     homeId: this.homeTeam.tgid,
  //     awayId: this.awayTeam.tgid,
  //     week: this.gameWeek,
  //     day: this.gameDay.key,
  //     time: this.timeToMinutesAfterMidnight(),
  //     gameResult: this.game.gameResult
  //   };


  //   await this.data.addGame(addGameRequest);
  //   this.location.back();
  // }

  editGame(): void {
    //do we need this?
    this.game.homeTeam = this.homeTeam;
    this.game.awayTeam = this.awayTeam;
    this.game.time = this.timeToMinutesAfterMidnight();
    this.game.day = this.gameDay.key;

    const addGameRequest: AddGameRequest = {
      homeId: this.homeTeam.tgid,
      awayId: this.awayTeam.tgid,
      week: this.gameWeek,
      day: this.gameDay.key,
      time: this.timeToMinutesAfterMidnight(),
      gameResult: this.game.gameResult
    };

    this.data.saveGame(addGameRequest, this.game.week, this.game.gameNumber).subscribe(data => {
      console.log(data);
      this.location.back();
    });
  }

  cancel(): void {
    this.location.back();
  }

  timeToMinutesAfterMidnight(): number {
    console.log(this.gameTime);
    let hour: number = +this.gameTime.slice(0, 2);
    let minutes: number = +this.gameTime.slice(3, 5);
    console.log(hour + ':' + minutes);
    let result: number = (hour * 60) + minutes;
    console.log(result);
    return result;
  }

  swapHomeAway(): void {
    let temp = this.homeTeam;
    this.homeTeam = this.awayTeam;
    this.awayTeam = temp;

    let tempList = this.availableHomeSchools;
    this.availableHomeSchools = this.availableAwaySchools;
    this.availableAwaySchools = tempList;
  }

  getAllWeeks(): number[] {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  }

  onValidateSliderChange($event: MatSlideToggleChange): void {
    this.setLists($event.checked);
  }

}
