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
          this.populateXDivRivalList();
        },
      ),
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  enabledToggle() {
    if (!this.isXDivEnabled) {
      this.nullifyXDivRivalValues();
    }
  }

  populateXDivRivalList() {
    this.xDivRivalList = [];
    if (this.conference.divisions.length === 2) {
      if (this.conference.divisions[0].schools[0].xDivRival != null) {
        this.isXDivEnabled = true;
        const div0Schools = this.conference.divisions[0].schools;
        for (let i = 0; i < div0Schools.length; i++) {
          const s = div0Schools[i];
          const xDivRival = this.findSchoolByTgid(
            s.xDivRival,
            this.conference.divisions[1].schools,
          );
          if (xDivRival != null) {
            this.xDivRivalList.push(xDivRival);
          } else {
            this.nullifyXDivRivalValues();
            this.initializeXDivRivalValues();
            break; // Break out of the loop
          }
        }
      } else {
        this.initializeXDivRivalValues();
      }
    } else {
      this.isXDivEnabled == false;
    }
  }

  private initializeXDivRivalValues() {
    this.conference.divisions[1].schools.forEach((s) => {
      this.xDivRivalList.push(s);
    });
    this.updateXDivRivalValues();
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
    this.updateXDivRivalValues();
    this.conferenceEditorService.updateSelectedConference(this.conference);
  }

  private updateXDivRivalValues() {
    this.xDivRivalList.forEach((s: School, index: number) => {
      const rival: School = this.conference.divisions[0].schools[index];
      s.xDivRival = rival.tgid;
      rival.xDivRival = s.tgid;
      //TODO: if we have issues upon saving, see if we need to set the school list under conference too!
    });
  }

  private nullifyXDivRivalValues() {
    this.xDivRivalList = [];
    this.conference.divisions[0].schools.forEach((s: School) => {
      s.xDivRival = null;
    });

    this.conference.divisions[1].schools.forEach((s: School) => {
      s.xDivRival = null;
    });
  }
}
