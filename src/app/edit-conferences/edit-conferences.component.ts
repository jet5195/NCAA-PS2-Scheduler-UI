import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Conference } from '../conference';
import { DataService } from '../services/data.service';
import { School } from '../school';
import { ConferenceComponent } from '../conference/conference.component';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-edit-conferences',
  templateUrl: './edit-conferences.component.html',
  styleUrls: ['./edit-conferences.component.css']
})
export class EditConferencesComponent implements OnInit {
  conferences: Conference[] = [];
  schools: School[] = [];

  @ViewChildren(ConferenceComponent) children!: QueryList<ConferenceComponent>;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getConferenceList().subscribe((data: Conference[]) => {
      console.log(data);
      this.conferences = data;
    });
    this.dataService.getSchools().subscribe((data: School[]) => {
      console.log(data);
      this.schools = data;
    });
  }

  onUpdated(updated: boolean) {
    this.children.forEach(child => {
      child.loadSchools();
    });
  }

  downloadSwapFile(): void {
    this.dataService.saveSwapToExcel().subscribe((response: any) => { 
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			//window.location.href = response.url;
		  fileSaver.saveAs(blob, 'swap.csv');
		//}), error => console.log('Error downloading the file'),
		}), (error: any) => console.log('Error downloading the file'), 
                 () => console.info('File downloaded successfully');
  }

}
