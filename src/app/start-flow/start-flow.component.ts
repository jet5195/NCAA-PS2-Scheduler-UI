import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

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

@Component({
  selector: 'app-start-flow',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './start-flow.component.html',
  styleUrl: './start-flow.component.css',
})
export class StartFlowComponent {
  public conferenceAlignmnentType = ConferenceAlignmentType;
  public schoolDataType = SchoolDataType;
  isLinear = true;
  selectedSchoolData: SchoolDataType;
  selectedAlignment: ConferenceAlignmentType;

  selectSchoolData(mode: SchoolDataType) {
    this.selectedSchoolData = mode;
  }

  selectAlignment(alignment: ConferenceAlignmentType) {
    this.selectedAlignment = alignment;
  }

  constructor() {}
}
