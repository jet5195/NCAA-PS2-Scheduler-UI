import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Game } from '../game';
import { DataService } from '../services/data.service';
import { DayOfWeekToStringPipe } from '../pipes/dayOfWeekToString.pipe';
import { MinutesAfterMidnightToTimePipe } from '../pipes/minutesAfterMidnightToTime.pipe';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        MatSelect,
        FormsModule,
        NgFor,
        MatOption,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        RouterLink,
        NgIf,
        MatButton,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MinutesAfterMidnightToTimePipe,
        DayOfWeekToStringPipe,
    ],
})
export class ScheduleComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  clickedRow?: Game;
  schedule: Game[] = [];
  week: number = 0;
  weeks: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  activatedRoute = new ActivatedRoute;
  displayedColumns: string[] = ['game', 'awayTeam', 'homeTeam', 'time', 'day','conferenceGame', 'result'];
  dataSource = new MatTableDataSource(this.schedule);
  expandedGame: Game | null | undefined;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.week = parseInt(this.route.snapshot.paramMap.get('week')!, 10);
      this.getScheduleByWeek(this.week);

    });
  }

  getScheduleByWeek(week: number): void {
    this.dataService.getScheduleByWeek(week).subscribe((data: Game[]) => {
      console.log(data);
      this.schedule = data;
      this.dataSource = new MatTableDataSource(this.schedule);
      this.dataSource.sort = this.sort;
    });;
  }

  updateRoute() {
    this.router.navigate(['/schedule/' + this.week]);
  }


}
