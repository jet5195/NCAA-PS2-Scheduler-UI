import { Component, OnInit } from '@angular/core';
import { Game } from '../game';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  game?: Game;

  constructor() { }

  ngOnInit(): void {
    this.loadGame();
  }

  loadGame(): void {
    
  }

}
