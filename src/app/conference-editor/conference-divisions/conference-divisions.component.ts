import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Division } from 'src/app/division';
import { School } from 'src/app/school';
import { ConferenceEditorService } from '../conference-editor.service';

@Component({
  selector: 'app-conference-divisions',
  templateUrl: './conference-divisions.component.html',
  styleUrl: './conference-divisions.component.css',
})
export class ConferenceDivisionsComponent {
  @Input() conferenceForm: FormGroup;
  @Input() allDivisions: Division[];

  constructor(
    private fb: FormBuilder,
    private conferenceEditorService: ConferenceEditorService
  ) {}

  get divisions(): FormArray {
    return this.conferenceForm.get('divisions') as FormArray;
  }

  removeDivision(index: number) {
    const div: Division = this.divisions.at(index).value;
    div.schools.forEach((school: School) => {
      school.divisionId = null;
    });
    this.divisions.removeAt(index);
    this.conferenceEditorService.updateSelectedConference(
      this.conferenceForm.value
    );
    this.conferenceEditorService.validateConferences();
  }

  addDivision(divisionData?: Division) {
    const divisionId = this.findNewDivisionId();
    const divisionGroup = this.fb.group({
      name: [divisionData ? divisionData.name : '', Validators.required],
      shortName: [
        divisionData ? divisionData.shortName : '',
        Validators.required,
      ],
      divisionId: [
        divisionData ? divisionData.divisionId : divisionId,
        Validators.required,
      ],
      schools: [[]],
    });
    this.divisions.push(divisionGroup);
    this.conferenceEditorService.validateConferences();
  }
  findNewDivisionId() {
    const divisionIds: number[] = this.allDivisions.map(
      (division) => division.divisionId
    );
    const confDivisionIds: number[] = this.divisions.controls.map(
      (divisionControl) => divisionControl.value.divisionId
    );

    divisionIds.push(...confDivisionIds);

    let newId = 0;
    while (divisionIds.includes(newId)) {
      newId++;
    }
    return newId;
  }
}
