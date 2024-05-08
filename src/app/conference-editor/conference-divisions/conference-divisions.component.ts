import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  }

  addDivision(divisionData?: Division) {
    const divisionGroup = this.fb.group({
      name: [divisionData ? divisionData.name : ''],
      shortName: [divisionData ? divisionData.shortName : ''],
      divisionId: [divisionData ? divisionData.divisionId : ''],
      schools: [[]],
    });
    this.divisions.push(divisionGroup);
    this.conferenceEditorService.updateSelectedConference(
      this.conferenceForm.value
    );
  }
}
