import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import * as fileSaver from 'file-saver';
import { Conference } from '../conference';
import { DataService } from '../services/data.service';
import { SnackBarService } from '../snackBar.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
//npm install @types/file-saver --save-dev
//if that doesn't work, npm install --save @types/filesaver

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [MatFormField, MatInput, FormsModule, MatButton, MatTooltip],
})
export class DashboardComponent implements OnInit {
  year: number = 0;
  activatedRoute = new ActivatedRoute();
  selectedSchedule!: File;
  selectedAlignment!: File;
  selectedBowls!: File;
  conferences: Conference[] = [];

  constructor(
    public dataService: DataService,
    private snackBarService: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.getYear();
  }

  autoAddGames(): void {
    this.dataService.autoAddGames().subscribe(
      (data: number) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          data + ' games have been added',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error automatically adding games',
          'Dismiss',
        );
      },
    );
  }

  autoAddGamesAggressive(): void {
    this.dataService.autoAddGamesAggressive().subscribe(
      (data: number) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          data + ' games have been modified (some may have been removed)',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error automatically adding games (aggressively adding rivalries)',
          'Dismiss',
        );
      },
    );
  }

  autoAddGamesRivals(): void {
    this.dataService.autoAddGamesRivals().subscribe(
      (data: number) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          data + ' games have been added',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error automatically adding rivalry games',
          'Dismiss',
        );
      },
    );
  }

  autoAddGamesRandom(): void {
    this.dataService.autoAddGamesRandomly().subscribe(
      (data: number) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          data + ' games have been added',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error automatically adding random games',
          'Dismiss',
        );
      },
    );
  }

  fixSchedule(): void {
    this.dataService.fixSchedule().subscribe(
      (data: number) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          data + ' extra games have been removed',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar('Error fixing schedule', 'Dismiss');
      },
    );
  }

  removeAllFcsGames(): void {
    this.dataService.removeAllFcsGames().subscribe(
      (data: number) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          data + ' games have been removed',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error removing all FCS games',
          'Dismiss',
        );
      },
    );
  }

  removeAllOocGames(): void {
    this.dataService.removeAllOocGames().subscribe(
      (data: number) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          data + ' games have been removed',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error removing all OOC games',
          'Dismiss',
        );
      },
    );
  }

  removeAllOocGamesNonRivalry(): void {
    this.dataService.removeAllOocGamesNonRivalry().subscribe(
      (data: number) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          data + ' games have been removed',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error removing all OOC games (non-rivalry)',
          'Dismiss',
        );
      },
    );
  }

  removeAllGames(): void {
    this.dataService.removeAllGames().subscribe(
      (data: number) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          data + ' games have been removed',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error removing all games',
          'Dismiss',
        );
      },
    );
  }

  xlsxSchoolDataChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    let schoolData = fileInputEvent.target.files[0];

    this.dataService.setSchoolDataFile(schoolData).subscribe(
      (data: any) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          'School Data has been set successfully',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error setting School Data, try checking your file',
          'Dismiss',
        );
      },
    );
  }

  xlsxScheduleChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.selectedSchedule = fileInputEvent.target.files[0];

    this.dataService.setScheduleFile(this.selectedSchedule).subscribe(
      (data: any) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          'Schedule has been set successfully',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error setting schedule, try checking your file',
          'Dismiss',
        );
        // if(error instanceof HttpErrorResponse){
        //   this.snackBarService.openSnackBar(error.statusText, "Dismiss");
        // }
        //console.log(error);
      },
    );
  }

  xlsxAlignmentChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.selectedAlignment = fileInputEvent.target.files[0];

    this.dataService.setAlignmentFile(this.selectedAlignment).subscribe(
      (data: any) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          'Conferences have been set successfully',
          'Dismiss',
        );
        this.dataService.getConferenceList().subscribe((data) => {
          this.conferences = data;
        });
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error setting conferences, try checking your file',
          'Dismiss',
        );
      },
    );
  }

  xlsxBowlChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.selectedBowls = fileInputEvent.target.files[0];

    this.dataService.setBowlFile(this.selectedBowls).subscribe(
      (data: any) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          'Bowls have been set successfully',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error setting bowls, try checking your file',
          'Dismiss',
        );
      },
    );
  }

  downloadSchoolData(): void {
    this.dataService.saveSchoolDataToExcel().subscribe((response: any) => {
      let blob: any = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fileSaver.saveAs(blob, 'SchoolData.xlsx');
    }),
      (error: any) => console.log('Error downloading SchoolData'),
      () => console.info('SchoolData downloaded successfully');
  }

  downloadFile(): void {
    this.dataService.saveScheduleToExcel().subscribe((response: any) => {
      let blob: any = new Blob([response], {
        type: 'text/json; charset=utf-8',
      });
      const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(blob, this.year + '_new_sched.csv');
    }),
      (error: any) => console.log('Error downloading the Schedule'),
      () => console.info('Schedule downloaded successfully');
  }

  downloadAlignment(): void {
    this.dataService.saveAlignmentToExcel().subscribe((response: any) => {
      let blob: any = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fileSaver.saveAs(blob, 'ConferenceAlignment.xlsx');
    }),
      (error: any) => console.log('Error downloading Alignment'),
      () => console.info('Alignment downloaded successfully');
  }

  getYear(): void {
    this.dataService.getYear().subscribe((data: number) => {
      console.log(data);
      this.year = data;
    });
  }

  setYear(year: number): void {
    this.dataService.setYear(year).subscribe(
      (data: any) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          'Year has been set successfully',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error setting year, please try again in a few moments',
          'Dismiss',
        );
      },
    );
  }

  removeAllConferenceGames(): void {
    this.dataService.removeAllConferenceGames().subscribe(
      (data: any) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          'Conference games have been removed successfully.',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error removing conference games.',
          'Dismiss',
        );
      },
    );
  }

  addAllConferenceGames(): void {
    this.dataService.addAllConferenceGames().subscribe(
      (data: any) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          'Conference games have been added successfully.',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error adding conference games.',
          'Dismiss',
        );
      },
    );
  }
}
