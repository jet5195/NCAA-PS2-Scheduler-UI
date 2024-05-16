import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Conference } from 'src/app/conference';
import { School } from '../../school';
import { ConferenceEditorService } from '../conference-editor.service';

@Component({
  selector: 'app-xdiv-rivalries',
  templateUrl: './xdiv-rivalries.component.html',
  styleUrl: './xdiv-rivalries.component.scss',
})
export class XdivRivalriesComponent implements OnInit, OnDestroy {
  isXDivEnabled: boolean = false;
  conference!: Conference;
  xDivRivalList: School[] = [];
  private subscriptions = new Subscription();

  constructor(private conferenceEditorService: ConferenceEditorService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.conferenceEditorService.selectedConference.subscribe(
        (conference) => {
          this.conference = conference;
          if (conference.divisions.length === 2) {
            if (conference.divisions[0].schools[0].xDivRival !== null) {
              this.isXDivEnabled = true;
            } else {
              this.isXDivEnabled = false;
            }
            if (this.isXDivEnabled) {
              if (
                conference.divisions[0].schools.length ==
                conference.divisions[1].schools.length
              ) {
                this.populateList();
              } else {
                this.nullifyXDivRivalValues();
              }
            }
          }
        },
      ),
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  enabledToggle() {
    if (this.isXDivEnabled) {
      this.nullifyXDivRivalValues();
    } else {
      this.initListWithDefaultValues();
      this.populateList();
    }
  }

  populateList() {
    this.xDivRivalList = [];
    if (this.xDivRivalsValuesValid()) {
      const div0Schools = this.conference.divisions[0].schools;
      for (let i = 0; i < div0Schools.length; i++) {
        const s = div0Schools[i];
        const xDivRival = this.findSchoolByTgid(
          s.xDivRival,
          this.conference.divisions[1].schools,
        );
        this.xDivRivalList.push(xDivRival);
      }
    } else {
      this.nullifyXDivRivalValues();
      this.initListWithDefaultValues();
    }
  }
  xDivRivalsValuesValid(): boolean {
    const div0Schools: School[] = this.conference.divisions[0].schools;
    const div1Schools: School[] = this.conference.divisions[1].schools;
    let result = true;
    div0Schools.forEach((s) => {
      const xDivRival = this.findSchoolByTgid(s.xDivRival, div1Schools);
      if (!xDivRival) {
        result = false;
      }
    });
    div1Schools.forEach((s) => {
      const xDivRival = this.findSchoolByTgid(s.xDivRival, div0Schools);
      if (!xDivRival) {
        result = false;
      }
    });
    console.log(result);
    return result;
  }

  private initListWithDefaultValues() {
    this.xDivRivalList = [];
    this.conference.divisions[1].schools.forEach((s) => {
      this.xDivRivalList.push(s);
    });
    this.updateXDivRivalValuesFromList();
  }

  findSchoolByTgid(tgid: number, schools: School[]): School | undefined {
    return schools.find((school: School) => school.tgid === tgid);
  }

  drop(event: CdkDragDrop<School[]>) {
    moveItemInArray(
      this.xDivRivalList,
      event.previousIndex,
      event.currentIndex,
    );
    this.updateXDivRivalValuesFromList();
  }

  private updateXDivRivalValuesFromList() {
    this.xDivRivalList.forEach((s: School, index: number) => {
      const rival: School = this.conference.divisions[0].schools[index];
      s.xDivRival = rival.tgid;
      rival.xDivRival = s.tgid;
      //TODO: if we have issues upon saving, see if we need to set the school list under conference too!
    });
    this.conferenceEditorService.updateSelectedConference(this.conference);
  }

  private nullifyXDivRivalValues() {
    this.conference.divisions[0].schools.forEach((s: School) => {
      s.xDivRival = null;
    });

    this.conference.divisions[1].schools.forEach((s: School) => {
      s.xDivRival = null;
    });
  }
}
