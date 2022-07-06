import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { School } from '../school';

@Component({
  selector: 'app-playoff-scheduler',
  templateUrl: './playoff-scheduler.component.html',
  styleUrls: ['./playoff-scheduler.component.css']
})
export class PlayoffSchedulerComponent implements OnInit {

  allSchools: School[]= [];
  playoffSchools: School[] = [];
  teamCount: number = 0;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamCount = parseInt(this.route.snapshot.paramMap.get('teamCount')!);
    });
    this.getSchools();
  }

  randomizeSelectedSchools(): void {
    let i: number = 0;
    while(i < this.teamCount){
      // let min = 0;
      // let max = this.allSchools.length-1;
      const random: number = Math.floor((Math.random()*this.allSchools.length));
      this.playoffSchools.push(this.allSchools[random]);
      i++;
    }
  }

  getSchools(): void {
    this.dataService.getSchools().subscribe(data =>{
      this.allSchools = data;
      this.randomizeSelectedSchools();
    })
  }


  compareSchools(s1: School, s2: School): boolean {
    if (s1.tgid === s2.tgid) {
      return true;
    }
    return false;
  }


}
