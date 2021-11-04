import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Game } from '../game';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  gameFormGroup!: FormGroup
  game!: Game;
  week!: number;
  gameNumber!: number;

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.week = parseInt(this.route.snapshot.paramMap.get('week')!, 10);
      this.gameNumber = parseInt(this.route.snapshot.paramMap.get('gameNumber')!, 10);
      this.loadGame();
    });
  }

  loadGame(): void {
    this.data.getGame(this.week, this.gameNumber).subscribe((data: Game) => {
      console.log(data);
      this.game = data;
    });
  }

}
