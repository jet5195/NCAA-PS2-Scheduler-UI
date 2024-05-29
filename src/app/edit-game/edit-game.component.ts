import { Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { AddGameRequest } from '../addGameRequest';
import { Game } from '../game';
import { MinutesAfterMidnightToTimePipe } from '../pipes/minutesAfterMidnightToTime.pipe';
import { School } from '../school';
import { CompareService } from '../services/compare.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css'],
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatFormField,
    MatLabel,
    MatSelect,
    FormsModule,
    NgFor,
    MatOption,
    MatInput,
    MatSlideToggle,
    MatButton,
    MatTooltip,
  ],
})
export class EditGameComponent implements OnInit {
  gameFormGroup!: FormGroup;
  game!: Game;
  gameTime!: string;
  gameDay!: string;
  week!: number;
  gameNumber!: number;
  availableHomeSchools!: School[];
  availableAwaySchools!: School[];
  initialHomeTeam!: School;
  initialAwayTeam!: School;
  homeTeam!: School;
  awayTeam!: School;
  dayList!: any[];
  emptyWeeks!: number[];
  gameWeek!: number;
  validate: boolean = true;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private mtmToTime: MinutesAfterMidnightToTimePipe,
    public compareService: CompareService,
  ) {}

  ngOnInit(): void {
    this.createDayList();
    this.route.params.subscribe((params) => {
      this.week = parseInt(this.route.snapshot.paramMap.get('week')!, 10);
      this.gameNumber = parseInt(
        this.route.snapshot.paramMap.get('gameNumber')!,
        10,
      );
      this.loadGame();
      //if editing bowl games, don't force validation
      if (this.week > 15) {
        this.validate = false;
      }
    });
  }

  createDayList(): void {
    this.dayList = [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ];
  }

  getAvailableHomeSchools(): void {
    this.getEmptyWeeks();
    this.data
      .getAvailableOpponents(this.awayTeam.tgid, this.week)
      .subscribe((data: School[]) => {
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
    this.data
      .getEmptyWeeksTwoTeams(this.awayTeam.tgid, this.homeTeam.tgid)
      .subscribe((data: number[]) => {
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
      this.data
        .getAvailableOpponents(this.homeTeam.tgid, this.week)
        .subscribe((data: School[]) => {
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
      this.game = data;
      this.gameWeek = data.week;
      this.homeTeam = data.homeTeam;
      this.awayTeam = data.awayTeam;
      this.initialHomeTeam = data.homeTeam;
      this.initialAwayTeam = data.awayTeam;
      this.setLists(this.validate);
      this.gameTime = this.mtmToTime.transform(data.time, true);
      this.gameDay = data.day;
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
    this.game.day = this.gameDay;

    const addGameRequest: AddGameRequest = {
      homeId: this.homeTeam.tgid,
      awayId: this.awayTeam.tgid,
      week: this.gameWeek,
      day: this.gameDay,
      time: this.timeToMinutesAfterMidnight(),
      gameResult: this.game.gameResult,
    };

    this.data
      .saveGame(addGameRequest, this.game.week, this.game.gameNumber)
      .subscribe((data) => {
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
    let result: number = hour * 60 + minutes;
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
    return [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21,
    ];
  }

  onValidateSliderChange($event: MatSlideToggleChange): void {
    this.setLists($event.checked);
  }
}
