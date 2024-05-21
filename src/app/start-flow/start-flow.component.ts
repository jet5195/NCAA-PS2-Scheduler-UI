import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DataService } from '../services/data.service';
import { SnackBarService } from '../snackBar.service';

export enum ConferenceAlignmentType {
  NEXT24_DEFAULT,
  NCAA06_DEFAULT,
  IMPORT,
  EDIT_IN_APP,
}

export enum SchoolDataType {
  NEXT24,
  NCAA06,
}

export enum ScheduleType {
  AUTOMATIC,
  MANUAL,
}

export interface CardOption {
  title: string;
  description: string;
  image: string;
  type?: SchoolDataType | ConferenceAlignmentType | ScheduleType;
  condition?: () => boolean;
  action?: () => void;
}

@Component({
  selector: 'app-start-flow',
  standalone: false,
  templateUrl: './start-flow.component.html',
  styleUrl: './start-flow.component.css',
})
export class StartFlowComponent implements OnInit {
  year: number = 0;
  @ViewChild('alignmentFileInput') alignmentFileInput: any;
  @ViewChild('scheduleFileInput') scheduleFileInput: any;
  @ViewChild('stepper') private stepper: MatStepper;
  public conferenceAlignmentType = ConferenceAlignmentType;
  public schoolDataType = SchoolDataType;
  isLinear = true;
  schoolDataFormGroup: FormGroup;
  alignmentFormGroup: FormGroup;

  schoolDataOptions: CardOption[] = [
    {
      title: 'NCAA 06 Schools',
      description: 'For use with Vanilla Copies of NCAA 06',
      image: 'assets/NCAA_FOOTBALL_06_COVER_ART.jpg',
      type: SchoolDataType.NCAA06,
      action: () => this.importNCAA06SchoolData(),
    },
    {
      title: 'NCAA NEXT 24 Schools',
      description: "For use with the NCAA NEXT '24 Mod",
      image: 'assets/NCAA_NEXT_24_COVER_ART.jpg',
      type: SchoolDataType.NEXT24,
      action: () => this.importNEXT24SchoolData(),
    },
  ];

  alignmentOptions: CardOption[] = [
    {
      title: 'NCAA 06 Conference Alignment',
      description: 'For use with Vanilla Copies of NCAA 06',
      image: 'assets/NCAA_FOOTBALL_06_COVER_ART.jpg',
      type: ConferenceAlignmentType.NCAA06_DEFAULT,
      condition: () =>
        this.schoolDataFormGroup.value.schoolData === SchoolDataType.NCAA06,
      action: () => this.importNCAA06Alignment(),
    },
    {
      title: 'NCAA NEXT 24 Conference Alignment',
      description: "For use with the NCAA NEXT '24 Mod",
      image: 'assets/NCAA_NEXT_24_COVER_ART.jpg',
      type: ConferenceAlignmentType.NEXT24_DEFAULT,
      condition: () =>
        this.schoolDataFormGroup.value.schoolData === SchoolDataType.NEXT24,
      action: () => this.importNEXT24Alignment(),
    },
    {
      title: 'Import Custom Conference Alignment',
      description: 'Import XLSX file with Custom Conference Setup',
      image: 'assets/IMPORT_ALIGNMENT.png',
      type: ConferenceAlignmentType.IMPORT,
      action: () => this.triggerAlignmentFileInput(),
    },
    {
      title: 'Customize Conference Alignment',
      description: 'Edit Conference Alignment',
      image: 'assets/CONFERENCE_EDIT.png',
      type: ConferenceAlignmentType.EDIT_IN_APP,
    },
  ];

  scheduleImportOptions: CardOption[] = [
    {
      title: 'Import Schedule',
      description: 'Import Schedule from Preseason of Dynasty Mode',
      image: 'assets/SCHEDULE_IMPORT.png',
      action: () => this.triggerScheduleFileInput(),
    },
  ];

  scheduleOptions: CardOption[] = [
    {
      title: 'Automatically Update Schedule',
      description:
        'Removes all games, then schedules them again based on your Conference Alignment.',
      image: 'assets/NCAA_FOOTBALL_06_COVER_ART.jpg',
      type: ScheduleType.AUTOMATIC,
    },
    {
      title: 'Manually Edit Schedule',
      description: 'Allows the User to manually update/edit the schedule.',
      image: 'assets/NCAA_FOOTBALL_06_COVER_ART.jpg',
      type: ScheduleType.MANUAL,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBarService: SnackBarService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.schoolDataFormGroup = this.fb.group({
      schoolData: [null, Validators.required],
    });
    this.alignmentFormGroup = this.fb.group({
      alignment: [null, Validators.required],
    });
    this.getYear();
  }

  getYear(): void {
    this.dataService.getYear().subscribe((data: number) => {
      this.year = data;
    });
  }

  setYear(year: number): void {
    this.dataService.setYear(year).subscribe(
      (data: any) => {
        this.snackBarService.openSnackBar(
          'Year has been set successfully',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error setting year, please try again.',
          'Dismiss',
        );
      },
    );
  }

  selectSchoolData(schoolDataType: any) {
    this.schoolDataFormGroup.get('schoolData').setValue(schoolDataType);
  }

  selectAlignment(alignmentType: any, action?: () => void) {
    this.alignmentFormGroup.get('alignment').setValue(alignmentType);
  }

  triggerAlignmentFileInput() {
    this.alignmentFileInput.nativeElement.click();
  }

  triggerScheduleFileInput() {
    this.scheduleFileInput.nativeElement.click();
  }

  setAlignmentFile(file: File) {
    this.dataService.setAlignmentFile(file).subscribe(
      (data: any) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          'Conferences have been set successfully',
          'Dismiss',
        );
        this.stepper.next();
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error setting conferences, try checking your file',
          'Dismiss',
        );
      },
    );
  }

  setSchoolDataFile(file: File) {
    this.dataService.setSchoolDataFile(file).subscribe(
      (data: any) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          'School Data has been set successfully',
          'Dismiss',
        );
        this.stepper.next();
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error setting School Data, try checking your file',
          'Dismiss',
        );
      },
    );
  }

  setScheduleFile(file: File) {
    this.dataService.setScheduleFile(file).subscribe(
      (data: any) => {
        this.snackBarService.openSnackBar(
          'Schedule has been set successfully',
          'Dismiss',
        );
        this.stepper.next();
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error setting schedule, try checking your file or exporting again',
          'Dismiss',
        );
      },
    );
  }

  importSchedule(fileInputEvent: any) {
    const file = fileInputEvent.target.files[0];
    this.setScheduleFile(file);
  }

  importConferenceAlignment(fileInputEvent: any) {
    const file = fileInputEvent.target.files[0];
    this.setAlignmentFile(file);
  }

  importNEXT24Alignment(): void {
    const fileName = 'NCAA-NEXT24.xlsx';
    const filePath = '/assets/' + fileName;
    this.http.get(filePath, { responseType: 'blob' }).subscribe((blob) => {
      const file = new File([blob], fileName, {
        type: blob.type,
      });
      this.setAlignmentFile(file);
    });
  }

  importNCAA06Alignment(): void {
    const fileName = 'Default_06_07_Conferences.xlsx';
    const filePath = '/assets/' + fileName;
    this.http.get(filePath, { responseType: 'blob' }).subscribe((blob) => {
      const file = new File([blob], fileName, {
        type: blob.type,
      });
      this.setAlignmentFile(file);
    });
  }

  importNEXT24SchoolData(): void {
    const fileName = 'NCAA_NEXT24_School_Data.xlsx';
    const filePath = '/assets/' + fileName;
    this.http.get(filePath, { responseType: 'blob' }).subscribe((blob) => {
      const file = new File([blob], fileName, {
        type: blob.type,
      });
      this.setSchoolDataFile(file);
    });
  }

  importNCAA06SchoolData(): void {
    const fileName = 'NCAA_06_School_Data.xlsx';
    const filePath = '/assets/' + fileName;
    this.http.get(filePath, { responseType: 'blob' }).subscribe((blob) => {
      const file = new File([blob], fileName, {
        type: blob.type,
      });
      this.setSchoolDataFile(file);
    });
  }
}
