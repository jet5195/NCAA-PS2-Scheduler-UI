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

  //Week 16 is conference title games
  //Week 17 - 20 are bowl games
  // 16 team playoffs 
  /*
  8 games week 17
  4 games week 18
  2 games week 19
  1 games week 20
  */

  // 8 team playoffs 
  /*
  4 games week 18
  2 games week 19
  1 games week 20
  */

  // 4 team playoffs 
  /*
  2 games week 19
  1 games week 20
  */

  //pseudo code
  /*
  1. WVU
  4. Oklahoma

  2. Kentucky
  3. USC

  original bowls
  rose
  USC vs OSU

  orange (natty)
  WVU vs Kentucky

  fiesta
  Oklahoma vs VT

  sugar
  Tennessee vs FSU

  new bowls
  rose
  USC vs Kentucky

  orange
  ?? vs ??


  */

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
