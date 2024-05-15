import { Component, Input } from '@angular/core';
import { School } from '../../../school';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lite-school-grid-tile',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, CommonModule],
  templateUrl: './lite-school-grid-tile.component.html',
  styleUrl: './lite-school-grid-tile.component.scss',
})
export class LiteSchoolGridTileComponent {
  @Input() school!: School;
}
