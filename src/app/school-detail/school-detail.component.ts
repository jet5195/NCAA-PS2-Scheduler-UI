import { Component, OnInit, Input } from '@angular/core';
import { School } from '../school';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatFabButton } from '@angular/material/button';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-school-detail',
    templateUrl: './school-detail.component.html',
    styleUrls: ['./school-detail.component.css'],
    standalone: true,
    imports: [NgIf, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatFabButton, RouterLink, MatIcon]
})
export class SchoolDetailComponent implements OnInit {

  panelOpenState = false;
  
  @Input() school?: School;

  constructor() { }

  ngOnInit(): void {
  }

  getContrast: any = function (hexcolor: string){
    if(hexcolor === ''){
      return 'black';
    }
    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
      hexcolor = hexcolor.slice(1);
    }
  
    // If a three-character hexcode, make six-character
    if (hexcolor.length === 3) {
      hexcolor = hexcolor.split('').map(function (hex) {
        return hex + hex;
      }).join('');
    }
  
    // Convert to RGB value
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
  
    // Get YIQ ratio
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
    // Check contrast
    return (yiq >= 128) ? 'black' : 'white';
  
  };

}
