import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import * as fileSaver from 'file-saver';
import { SnackBarService } from '../snackBar.service';
import { Conference } from '../conference';
//npm install @types/file-saver --save-dev
//if that doesn't work, npm install --save @types/filesaver

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  year: number = 0;
  activatedRoute = new ActivatedRoute;
  selectedSchedule!: File;
  selectedAlignment!: File;
  selectedBowls!: File;

  constructor(public dataService: DataService, private route: ActivatedRoute, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.getYear();
  }

  autoAddGames(): void {
    this.dataService.autoAddGames().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been added", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error automatically adding games", "Dismiss");
    });
  }

  autoAddGamesAggressive(): void {
    this.dataService.autoAddGamesAggressive().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been modified (some may have been removed)", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error automatically adding games (aggressively adding rivalries)", "Dismiss");
    });
  }

  autoAddGamesRivals(): void {
    this.dataService.autoAddGamesRivals().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been added", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error automatically adding rivalry games", "Dismiss");
    });
  }

  autoAddGamesRandom(): void {
    this.dataService.autoAddGamesRandomly().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been added", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error automatically adding random games", "Dismiss");
    });
  }

  fixSchedule(): void {
    this.dataService.fixSchedule().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " extra games have been removed", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error fixing schedule", "Dismiss");
    });
  }

  removeAllFcsGames(): void {
    this.dataService.removeAllFcsGames().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been removed", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error removing all FCS games", "Dismiss");
    });
  }

  removeAllOocGames(): void {
    this.dataService.removeAllOocGames().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been removed", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error removing all OOC games", "Dismiss");
    });
  }

  removeAllOocGamesNonRivalry(): void {
    this.dataService.removeAllOocGamesNonRivalry().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been removed", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error removing all OOC games (non-rivalry)", "Dismiss");
    });
  }

  removeAllGames(): void {
    this.dataService.removeAllGames().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been removed", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error removing all games", "Dismiss");
    });
  }



  xlsxScheduleChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.selectedSchedule = fileInputEvent.target.files[0];

    this.dataService.setScheduleFile(this.selectedSchedule).subscribe((data: any) => {
      console.log(data);
      this.snackBarService.openSnackBar("Schedule has been set successfully", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error setting schedule, try checking your file", "Dismiss");
      // if(error instanceof HttpErrorResponse){
      //   this.snackBarService.openSnackBar(error.statusText, "Dismiss");
      // }
      //console.log(error);
    });
  }

  xlsxAlignmentChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.selectedAlignment = fileInputEvent.target.files[0];

    this.dataService.setAlignmentFile(this.selectedAlignment).subscribe((data: any) => {
      console.log(data);
      this.snackBarService.openSnackBar("Conferences have been set successfully", "Dismiss");
      this.dataService.loadAllConferences();
    }, error => {
      this.snackBarService.openSnackBar("Error setting conferences, try checking your file", "Dismiss");
    });
  }

  xlsxBowlChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.selectedBowls = fileInputEvent.target.files[0];

    this.dataService.setBowlFile(this.selectedBowls).subscribe((data: any) => {
      console.log(data);
      this.snackBarService.openSnackBar("Bowls have been set successfully", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error setting bowls, try checking your file", "Dismiss");
    });
  }

  downloadFile(): void {
    this.dataService.saveScheduleToExcel().subscribe((response: any) => {
      let blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(blob, this.year + '_new_sched.csv');
      //}), error => console.log('Error downloading the file'),
    }), (error: any) => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  getYear(): void {
    this.dataService.getYear().subscribe((data: number) => {
      console.log(data);
      this.year = data;
    });
  }

  setYear(year: number): void {
    this.dataService.setYear(year).subscribe((data: any) => {
      console.log(data);
      this.snackBarService.openSnackBar("Year has been set successfully", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error setting year, please try again in a few moments", "Dismiss");
    });
  }

  removeAllConferenceGames(): void {
    this.dataService.removeAllConferenceGames().subscribe((data: any) => {
      console.log(data);
      this.snackBarService.openSnackBar("Conference games have been removed successfully.", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error removing conference games.", "Dismiss");
    });
  }

  addAllConferenceGames(): void {
    this.dataService.addAllConferenceGames().subscribe((data: any) => {
      console.log(data);
      this.snackBarService.openSnackBar("Conference games have been added successfully.", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error adding conference games.", "Dismiss");
    });
  }

}
