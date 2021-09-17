import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import * as fileSaver from 'file-saver';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '../snackBar.service';
//npm install @types/file-saver --save-dev
//if that doesn't work, npm install --save @types/filesaver

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private scheduleService: ScheduleService, private route: ActivatedRoute, private snackBarService: SnackBarService) { }

  activatedRoute = new ActivatedRoute;

  ngOnInit(): void {
  }

  autoAddGames(): void {
    this.scheduleService.autoAddGames().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been added", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error automatically adding games", "Dismiss");
    });
  }

  autoAddGamesAggressive(): void {
    this.scheduleService.autoAddGamesAggressive().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been modified (some may have been removed)", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error automatically adding games (aggressively adding rivalries)", "Dismiss");
    });
  }

  autoAddGamesRivals(): void {
    this.scheduleService.autoAddGamesRivals().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been added", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error automatically adding rivalry games", "Dismiss");
    });
  }

  autoAddGamesRandom(): void {
    this.scheduleService.autoAddGamesRandomly().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been added", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error automatically adding random games", "Dismiss");
    });
  }

  fixSchedule(): void {
    this.scheduleService.fixSchedule().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " extra games have been removed", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error fixing schedule", "Dismiss");
    });
  }

  removeAllFcsGames(): void {
    this.scheduleService.removeAllFcsGames().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been removed", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error removing all FCS games", "Dismiss");
    });
  }

  removeAllOocGames(): void {
    this.scheduleService.removeAllOocGames().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been removed", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error removing all OOC games", "Dismiss");
    });
  }

  removeAllOocGamesNonRivalry(): void {
    this.scheduleService.removeAllOocGamesNonRivalry().subscribe((data: number) => {
      console.log(data);
      this.snackBarService.openSnackBar(data + " games have been removed", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error removing all OOC games (non-rivalry)", "Dismiss");
    });
  }

  selectedSchedule!: File;
  selectedAlignment!: File;

  xlsxScheduleChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.selectedSchedule = fileInputEvent.target.files[0];

    this.scheduleService.setScheduleFile(this.selectedSchedule).subscribe((data: any) => {
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

    this.scheduleService.setAlignmentFile(this.selectedAlignment).subscribe((data: any) => {
      console.log(data);
      this.snackBarService.openSnackBar("Conferences have been set successfully", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error setting conferences, try checking your file", "Dismiss");
    });
  }

  downloadFile(): void {
    this.scheduleService.saveScheduleToExcel().subscribe((response: any) => { 
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			//window.location.href = response.url;
		  fileSaver.saveAs(blob, 'new_sched.xlsx');
		//}), error => console.log('Error downloading the file'),
		}), (error: any) => console.log('Error downloading the file'), 
                 () => console.info('File downloaded successfully');
  }

}
