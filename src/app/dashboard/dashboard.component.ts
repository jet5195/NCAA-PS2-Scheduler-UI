import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import * as fileSaver from 'file-saver';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '../snackBar.service';
//@types/file-saver --save-dev

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
    this.scheduleService.autoAddGames().subscribe((data: any) => {
      console.log(data);
    });
  }

  autoAddGamesAggressive(): void {
    this.scheduleService.autoAddGamesAggressive().subscribe((data: any) => {
      console.log(data);
    });
  }

  fixSchedule(): void {
    this.scheduleService.fixSchedule().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeAllFcsGames(): void {
    this.scheduleService.removeAllFcsGames().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeAllOocGames(): void {
    this.scheduleService.removeAllOocGames().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeAllOocGamesNonRivalry(): void {
    this.scheduleService.removeAllOocGamesNonRivalry().subscribe((data: any) => {
      console.log(data);
    });
  }

  saveToFile(): void {
    this.scheduleService.saveToFile().subscribe((data: any) => {
      console.log(data);
    });
  }

  selectedSchedule!: File;
  selectedAlignment!: File;

  xlsxScheduleChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.selectedSchedule = fileInputEvent.target.files[0];

    this.scheduleService.setScheduleFile(this.selectedSchedule).subscribe((data: any) => {
      console.log(data);
      this.snackBarService.openSnackBar("Schedule has been set successfully.", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error setting schedule, try checking your file.", "Dismiss");
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
      this.snackBarService.openSnackBar("Conferences have been set successfully.", "Dismiss");
    }, error => {
      this.snackBarService.openSnackBar("Error setting conferences, try checking your file.", "Dismiss");
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
