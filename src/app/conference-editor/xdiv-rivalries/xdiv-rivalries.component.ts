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
          if (conference !== this.conference) {
            this.isXDivEnabled = false;
            this.conference = conference;
            this.populateXDivRivalList();
          }
        },
      ),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  populateXDivRivalList() {
    this.xDivRivalList = [];
    if (this.conference.divisions.length === 2) {
      if (this.conference.divisions[0].schools[0].xDivRival != null) {
        this.isXDivEnabled = true;
        this.conference.divisions[0].schools.forEach((s) => {
          this.xDivRivalList.push(this.findSchoolByTgid(s.xDivRival));
        });
      } else {
        this.conference.divisions[1].schools.forEach((s) => {
          this.xDivRivalList.push(s);
        });
        this.updateXDivRivalValues();
      }
    }
  }

  findSchoolByTgid(tgid: number): School | undefined {
    return this.conference.schools.find(
      (school: School) => school.tgid === tgid,
    );
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
      //TODO: if we have issues, see if we need to set the school list under conference too!
    });
  }
}
