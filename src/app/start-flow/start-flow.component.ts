import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  MatStep,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import { ConferenceEditorComponent } from '../conference-editor/conference-editor.component';
import { FilterOptionsPipe } from '../pipes/filter-options.pipe';
import { DataService } from '../services/data.service';
import { SnackBarService } from '../snackBar.service';
import { StartFlowConferenceComponent } from './start-flow-conference/start-flow-conference.component';
import { StartFlowScheduleComponent } from './start-flow-schedule/start-flow-schedule.component';

export enum ConferenceAlignmentType {
  NEXT24_DEFAULT,
  NCAA06_DEFAULT,
  IMPORT,
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
  templateUrl: './start-flow.component.html',
  styleUrl: './start-flow.component.css',
  standalone: true,
  imports: [
    MatStepper,
    MatStep,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardImage,
    MatCardContent,
    MatButton,
    MatStepperNext,
    MatStepperPrevious,
    NgIf,
    ConferenceEditorComponent,
    MatFormField,
    MatInput,
    FilterOptionsPipe,
    StartFlowConferenceComponent,
    StartFlowScheduleComponent,
  ],
})
export class StartFlowComponent implements OnInit {
  year: number = 0;
  @ViewChild('stepper') private stepper: MatStepper;
  public conferenceAlignmentType = ConferenceAlignmentType;
  public schoolDataType = SchoolDataType;
  isLinear = true;
  schoolDataFormGroup: FormGroup;

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
