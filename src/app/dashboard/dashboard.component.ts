import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { School } from '../school';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private scheduleService: ScheduleService, private route: ActivatedRoute) { }

  activatedRoute = new ActivatedRoute;

  ngOnInit(): void {
  }

  autoAddGames(): void {
    this.scheduleService.autoAddGames().subscribe((data: any) => {
      console.log(data);
    });
  }

  autoAddGamesAggressive(): void {
    this.scheduleService.autoAddGamesAggressive().subscribe((data: any) => {
      console.log(data);
    });
  }

  fixSchedule(): void {
    this.scheduleService.fixSchedule().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeAllFcsGames(): void {
    this.scheduleService.removeAllFcsGames().subscribe((data: any) => {
      console.log(data);
    });;
  }

  removeAllOocGames(): void {
    this.scheduleService.removeAllOocGames().subscribe((data: any) => {
      console.log(data);
    });;
  }

  removeAllOocGamesNonRivalry(): void {
    this.scheduleService.removeAllOocGamesNonRivalry().subscribe((data: any) => {
      console.log(data);
    });;
  }

  saveToFile(): void{
    this.scheduleService.saveToFile().subscribe((data: any) => {
      console.log(data);
    });
  }

}
