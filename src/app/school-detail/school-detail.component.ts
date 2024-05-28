import { NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Conference } from '../conference';
import { School } from '../school';

@Component({
  selector: 'app-school-detail',
  templateUrl: './school-detail.component.html',
  styleUrls: ['./school-detail.component.css'],
  standalone: true,
  imports: [
    NgIf,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFabButton,
    RouterLink,
    MatIcon,
    NgStyle,
  ],
})
export class SchoolDetailComponent implements OnInit {
  constructor(private dataService: DataService) {}

  panelOpenState = false;

  @Input() school?: School;
  conferences: Conference[] = [];

  ngOnInit(): void {
    this.dataService.getConferenceList().subscribe((data) => {
      this.conferences = data;
    });
  }

  getContrast: any = function (hexcolor: string) {
    if (hexcolor === '' || hexcolor === null) {
      return 'black';
    }
    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
      hexcolor = hexcolor.slice(1);
    }

    // If a three-character hexcode, make six-character
    if (hexcolor.length === 3) {
      hexcolor = hexcolor
        .split('')
        .map(function (hex) {
          return hex + hex;
        })
        .join('');
    }

    // Convert to RGB value
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);

    // Get YIQ ratio
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Check contrast
    return yiq >= 128 ? 'black' : 'white';
  };

  getConferenceNameById(conferenceId: number): string {
    const conf = this.conferences.find(
      (conf) => conf.conferenceId === conferenceId,
    );
    if (conf) {
      return conf.shortName;
    } else {
      return '';
    }
  }

  getDivisionNameById(divisionId: number): string {
    if (divisionId) {
      const divisions = this.conferences.flatMap((conf) => conf.divisions);
      const div = divisions.find((div) => div.divisionId === divisionId);
      if (div) {
        return div.shortName;
      }
    }
    return '';
  }
}
