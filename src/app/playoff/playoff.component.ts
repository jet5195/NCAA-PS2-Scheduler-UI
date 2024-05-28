import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';

@Component({
    selector: 'app-playoff',
    templateUrl: './playoff.component.html',
    styleUrls: ['./playoff.component.css'],
    standalone: true,
    imports: [MatCard, MatCardContent, RouterLink, MatCardTitle]
})
export class PlayoffComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
