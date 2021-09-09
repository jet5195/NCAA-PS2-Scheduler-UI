import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private scheduleService: ScheduleService, private route: ActivatedRoute) { }

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
    });
  }

  xlsxAlignmentChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.selectedAlignment = fileInputEvent.target.files[0];

    this.scheduleService.setAlignmentFile(this.selectedAlignment).subscribe((data: any) => {
      console.log(data);
    });
  }

  downloadFile(): void {
    this.scheduleService.saveScheduleToExcel().subscribe((response: any) => { //when you use stricter type checking
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			//window.location.href = response.url;
		  fileSaver.saveAs(blob, 'new_sched.xlsx');
		//}), error => console.log('Error downloading the file'),
		}), (error: any) => console.log('Error downloading the file'), //when you use stricter type checking
                 () => console.info('File downloaded successfully');
  }

  // srcResult!: object;

  // onFileSelected() {
  //   const inputNode: any = document.querySelector('#file');

  //   if (typeof (FileReader) !== 'undefined') {
  //     const reader = new FileReader();

  //     reader.onload = (e: any) => {
  //       this.srcResult = e.target.result;
  //     };

  //     reader.readAsArrayBuffer(inputNode.files[0]);
  //   }
  // }

}
