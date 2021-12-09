import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Game } from '../game';
import { Location } from '@angular/common';
import { School } from '../school';
import { MinutesAfterMidnightToTimePipe } from '../pipes/minutesAfterMidnightToTime.pipe';
import { DayOfWeekToStringPipe } from '../pipes/dayOfWeekToString.pipe';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  gameFormGroup!: FormGroup
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

  constructor(private data: DataService, private route: ActivatedRoute, private location: Location, 
    private mtmToTime: MinutesAfterMidnightToTimePipe, private dowToString: DayOfWeekToStringPipe) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.week = parseInt(this.route.snapshot.paramMap.get('week')!, 10);
      this.gameNumber = parseInt(this.route.snapshot.paramMap.get('gameNumber')!, 10);
      this.loadGame();
    });
  }

  getAvailableSchools(tgid:number): School[] {
    let schoolList!: School[];
    this.data.getAvailableOpponents(tgid, this.week).subscribe((data: School[]) => {
      console.log(data);
      schoolList = data;
      return schoolList;
    })
    return schoolList;
  }

  getAvailableHomeSchools(): void {
    this.data.getAvailableOpponents(this.awayTeam.tgid, this.week).subscribe((data: School[]) => {
      console.log(data);
      this.availableHomeSchools = data;
      if(!this.availableHomeSchools.includes(this.initialHomeTeam)){
        this.availableHomeSchools.unshift(this.initialHomeTeam);
      }
      if(!this.availableHomeSchools.includes(this.homeTeam)){
        this.availableHomeSchools.unshift(this.homeTeam);
      }
    });
  }

  getAvailableAwaySchools(): void {
    this.data.getAvailableOpponents(this.homeTeam.tgid, this.week).subscribe((data: School[]) => {
      console.log(data);
      this.availableAwaySchools = data;
      if(!this.availableAwaySchools.includes(this.initialAwayTeam)){
        this.availableAwaySchools.unshift(this.initialAwayTeam);
      }
      if(!this.availableAwaySchools.includes(this.awayTeam)){
        this.availableAwaySchools.unshift(this.awayTeam);
      }
    });
  }

  loadGame(): void {
    this.data.getGame(this.week, this.gameNumber).subscribe((data: Game) => {
      console.log(data);
      this.game = data;
      this.homeTeam = data.homeTeam;
      this.awayTeam = data.awayTeam;
      this.initialHomeTeam = data.homeTeam;
      this.initialAwayTeam = data.awayTeam;
      // this.availableHomeSchools = this.getAvailableSchools(data.homeTeam.tgid);
      // this.availableAwaySchools = this.getAvailableSchools(data.awayTeam.tgid);
      this.getAvailableHomeSchools();
      this.getAvailableAwaySchools();
      this.gameTime = this.mtmToTime.transform(data.time);
      this.gameDay = this.dowToString.transform(data.day, true);
    });
  }

  save(): void {
    console.log(this.game.time);
    let time: number = this.timeToMinutesAfterMidnight();
  }

  cancel(): void {
    this.location.back();
  }

  timeToMinutesAfterMidnight(): number {
    console.log(this.gameTime);
    let hour: number = +this.gameTime.slice(0,2);
    let minutes: number = +this.gameTime.slice(3,5);
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

  compareSchools(s1: School, s2: School): boolean {
    if (s1.tgid === s2.tgid) {
      return true;
    }
    return false;
  }

}
