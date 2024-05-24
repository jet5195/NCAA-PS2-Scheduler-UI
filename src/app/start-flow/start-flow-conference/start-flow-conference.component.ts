import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { DataService } from 'src/app/services/data.service';
import { SnackBarService } from 'src/app/snackBar.service';
import { ConferenceEditorComponent } from '../../conference-editor/conference-editor.component';
import { FilterOptionsPipe } from '../../pipes/filter-options.pipe';
import {
  CardOption,
  ConferenceAlignmentType,
  SchoolDataType,
} from '../start-flow.component';

@Component({
  selector: 'app-start-flow-conference',
  standalone: true,
  templateUrl: './start-flow-conference.component.html',
  styleUrl: './start-flow-conference.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    FilterOptionsPipe,
    FormsModule,
    ReactiveFormsModule,
    ConferenceEditorComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class StartFlowConferenceComponent implements OnInit {
  @ViewChild('tabs', { static: false }) matTabGroup: MatTabGroup;
  @Input() schoolDataFormGroup: FormGroup;
  @ViewChild('alignmentFileInput') alignmentFileInput: any;
  isAlignmentSet: boolean = false;
  enableSpinner: boolean = false;
  @Input() alignmentFormGroup: FormGroup;
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
  ];
  selectAlignment(alignmentType: any, action?: () => void) {
    this.alignmentFormGroup.get('alignment').setValue(alignmentType);
  }
  stepper: any;
  constructor(
    private dataService: DataService,
    private snackBarService: SnackBarService,
    private http: HttpClient,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    //check existing alignment, if we have data. Then enable edit button
    this.dataService.getConferenceList().subscribe((data) => {
      if (data.length > 0) {
        this.isAlignmentSet = true;
      }
    });

    this.alignmentFormGroup = this.fb.group({
      alignment: [null, Validators.required],
    });
  }

  triggerAlignmentFileInput() {
    this.alignmentFileInput.nativeElement.click();
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

  setAlignmentFile(file: File) {
    this.enableSpinner = true;
    this.dataService.setAlignmentFile(file).subscribe(
      (data: any) => {
        this.isAlignmentSet = true;
        this.enableSpinner = false;
        this.matTabGroup.selectedIndex = 1;
        this.cdRef.detectChanges();
        this.snackBarService.openSnackBar(
          'Conferences have been set successfully',
          'Dismiss',
        );
      },
      (error) => {
        this.isAlignmentSet = false;
        this.enableSpinner = false;
        this.snackBarService.openSnackBar(
          'Error setting conferences, try checking your file',
          'Dismiss',
        );
      },
    );
  }
}
