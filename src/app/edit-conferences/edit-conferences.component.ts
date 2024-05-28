import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import * as fileSaver from 'file-saver';
import { Conference } from '../conference';
import { ConferenceComponent } from '../conference/conference.component';
import { School } from '../school';
import { DataService } from '../services/data.service';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFabButton } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-edit-conferences',
    templateUrl: './edit-conferences.component.html',
    styleUrls: ['./edit-conferences.component.css'],
    standalone: true,
    imports: [
        NgFor,
        ConferenceComponent,
        MatFabButton,
        MatTooltip,
        MatIcon,
    ],
})
export class EditConferencesComponent implements OnInit {
  conferences: Conference[] = [];
  schools: School[] = [];

  @ViewChildren(ConferenceComponent) children!: QueryList<ConferenceComponent>;

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getConferenceList().subscribe((data: Conference[]) => {
      this.conferences = data;
    });
    this.dataService.getSchools().subscribe((data: School[]) => {
      this.schools = data;
    });
  }

  onUpdated(updated: boolean) {
    this.children.forEach((child) => {
      child.loadSchools();
    });
  }

  downloadSwapFile(): void {
    this.dataService.saveSwapToExcel().subscribe((response: any) => {
      let blob: any = new Blob([response], {
        type: 'text/json; charset=utf-8',
      });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(blob, 'swap.csv');
      //}), error => console.log('Error downloading the file'),
    }),
      (error: any) => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }
}
