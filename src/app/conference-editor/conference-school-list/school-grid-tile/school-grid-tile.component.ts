import {Component, Input} from '@angular/core';
import {School} from "../../../school";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-school-grid-tile',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, CommonModule],
  templateUrl: './school-grid-tile.component.html',
  styleUrl: './school-grid-tile.component.scss'
})
export class SchoolGridTileComponent {

  @Input() school?: School;
  @Input() isDark: (color: string) => boolean;
  @Input() isAddCard: boolean;
}
