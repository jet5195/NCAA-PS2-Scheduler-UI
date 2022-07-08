import { Component, OnInit } from '@angular/core';
import { Bowl } from '../bowl';
import { DataService } from '../data.service';

@Component({
  selector: 'app-bowls',
  templateUrl: './bowls.component.html',
  styleUrls: ['./bowls.component.css']
})
export class BowlsComponent implements OnInit {

  bowlList!: Bowl[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getBowlList();
  }

  getBowlList() {
    this.dataService.getBowlList().subscribe((data: Bowl[]) => {
      console.log(data);
      this.bowlList = data;
    });
  }

}


