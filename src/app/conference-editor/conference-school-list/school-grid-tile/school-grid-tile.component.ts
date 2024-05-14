import { Component, Input } from '@angular/core';
import { School } from '../../../school';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-school-grid-tile',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, CommonModule],
  templateUrl: './school-grid-tile.component.html',
  styleUrl: './school-grid-tile.component.scss',
})
export class SchoolGridTileComponent {
  @Input() school?: School;
  @Input() isAddCard: boolean;

  isDark(color: string): boolean {
    if (color) {
      const rgb = parseInt(color.slice(1), 16); // Convert hex to integer
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      // Calculate brightness
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128; // True if dark background
    }
    return false;
  }
}
