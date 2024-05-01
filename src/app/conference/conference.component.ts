import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { EventEmitter } from 'stream';
import { Conference } from '../conference';
import { DataService } from '../data.service';
import { School } from '../school';
import { SnackBarService } from '../snackBar.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {

  @Input() conference!: Conference;
  @Output() updated = new EventEmitter<boolean>();

  divSchools: School[][] = [];

  constructor(public dataService: DataService, private snackBarService: SnackBarService) { }

  panelOpenState = false;

  ngOnInit(): void {
    this.loadSchools();
  }

  loadSchools(): void {
    if (this.conference.divisions !== null) {
      this.getSchoolsByDivision();
    }
  }

  getSchoolsByDivision(): void {
    this.dataService.getSchoolsByDivision(this.conference.name, this.conference.divisions[0]).subscribe((data: School[]) => {
      console.log(data);
      this.divSchools[0] = data;
    });
    this.dataService.getSchoolsByDivision(this.conference.name, this.conference.divisions[1]).subscribe((data: School[]) => {
      console.log(data);
      this.divSchools[1] = data;
    });
  }

  removeConferenceGames(): void {
    this.dataService.removeConferenceGames(this.conference.name).subscribe((data: void) => {
      console.log(data);
      this.snackBarService.openSnackBar("Conference games have been removed successfully", "Dismiss");
    }, (error: any) => {
      this.snackBarService.openSnackBar("Error removing conference games", "Dismiss");
    });
  }

  addConferenceGames(): void {
    this.dataService.addConferenceGames(this.conference.name).subscribe((data: void) => {
      console.log(data);this.snackBarService.openSnackBar("Conference games have been added succesfully", "Dismiss");
    }, (error: any) => {
      this.snackBarService.openSnackBar("Error adding conference games", "Dismiss");
    });
  }

  onClick(selectedSchool: School): void {
    if (this.dataService.getSelectedSchool() !== undefined) {
      if (this.dataService.getSelectedSchool() === selectedSchool) {
        this.dataService.setSelectedSchool(undefined);
      } else if (this.dataService.getSelectedSchool()?.conference.name === selectedSchool.conference.name && this.dataService.getSelectedSchool()?.division === selectedSchool.division) {
        this.dataService.setSelectedSchool(selectedSchool);
      }
      else {
        this.swap(selectedSchool)
      }
    } else {
      this.dataService.setSelectedSchool(selectedSchool);
    }
  }

  swap(selectedSchool: School): void {
    let tempConf: Conference;
    let tempDiv: string;
    let tempNcaaDiv: string;

    tempConf = selectedSchool.conference;
    tempDiv = selectedSchool.division;
    tempNcaaDiv = selectedSchool.ncaaDivision;

    selectedSchool.conference = this.dataService.getSelectedSchool()!.conference;
    selectedSchool.division = this.dataService.getSelectedSchool()!.division;
    selectedSchool.ncaaDivision = this.dataService.getSelectedSchool()!.ncaaDivision;

    this.dataService.getSelectedSchool()!.conference = tempConf;
    this.dataService.getSelectedSchool()!.division = tempDiv;
    this.dataService.getSelectedSchool()!.ncaaDivision = tempNcaaDiv;

    this.dataService.swapSchools(this.dataService.getSelectedSchool()!.tgid, selectedSchool.tgid).subscribe((data: any) => {
      console.log(data);
      this.updated.emit(true);
      this.dataService.setSelectedSchool(undefined);
      //this.loadSchools();
    })
  }

  getContrast: any = function (hexcolor: string) {
    if (hexcolor === '') {
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
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);

    // Get YIQ ratio
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    // Check contrast
    return (yiq >= 128) ? 'black' : 'white';

  };


}
