import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { Bowl } from '../bowl';
import { Conference } from '../conference';
import { DataService } from '../services/data.service';
import { ConferenceLogoPipe } from '../pipes/conferenceLogo';
import { MinutesAfterMidnightToTimePipe } from '../pipes/minutesAfterMidnightToTime.pipe';

@Component({
    selector: 'app-bowls',
    templateUrl: './bowls.component.html',
    styleUrls: ['./bowls.component.css'],
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MinutesAfterMidnightToTimePipe, ConferenceLogoPipe]
})
export class BowlsComponent implements OnInit {

  bowlList: Bowl[] = [];
  conferenceList: Conference[] | undefined = [];
  dataSource: MatTableDataSource<Bowl> = new MatTableDataSource();
  displayedColumns: String[] = ['conference1Id', 'conference1Rank', 'conference2Id', 'conference2Rank', 'bmfd', 'stadiumId', 'trophyId', 'time', 'bowlName', 'bowlMonth', 'week', 'bowlLogo', 'bowlIndex', 'day']; 

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.getBowlList();
    this.dataService.getConferenceList().subscribe(data => {
      this.conferenceList = data;
    });
  }

  getBowlList() {
    this.dataService.getBowlList().subscribe((data: Bowl[]) => {
      console.log(data);
      this.bowlList = data;
      this.dataSource.data = this.bowlList;
    });
  }
}


