import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AddGameRequest } from '../addGameRequest';
import { DataService } from '../services/data.service';
import { Game } from '../game';
import { School } from '../school';
import { SnackBarService } from '../snackBar.service';
import { SuggestedGameResponse } from '../suggestedGameResponse';
import { CompareService } from '../services/compare.service';
import { DayOfWeekToStringPipe } from '../pipes/dayOfWeekToString.pipe';
import { MinutesAfterMidnightToTimePipe } from '../pipes/minutesAfterMidnightToTime.pipe';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { MatOption } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';


@Component({
    selector: 'app-school-schedule',
    templateUrl: './school-schedule.component.html',
    styleUrls: ['./school-schedule.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    standalone: true,
    imports: [
        NgIf,
        MatButton,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        RouterLink,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatFormField,
        MatLabel,
        MatSelect,
        FormsModule,
        NgFor,
        MatOption,
        MatRadioGroup,
        MatRadioButton,
        MinutesAfterMidnightToTimePipe,
        DayOfWeekToStringPipe,
    ],
})
// @Injectable({
//   providedIn: 'root' // just before your class
// })
export class SchoolScheduleComponent implements OnInit {
  school!: School;
  clickedRow?: Game;
  suggestedGame?: SuggestedGameResponse;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  schedule: Game[] = [];
  activatedRoute = new ActivatedRoute;
  tgid!: number;

  selectedOpponent!: School;
  selectedWeek!: number;
  availableOpponents: School[] = [];
  availableWeeks: number[] = [];
  isHomeTeam!: boolean;

  displayedColumns: string[] = ['game', 'week', 'opponent', 'time', 'day', 'conferenceGame', 'result'];
  dataSource = new MatTableDataSource(this.schedule);
  expandedGame: Game | null | undefined;

  constructor(private dataService: DataService, private snackBarService: SnackBarService, private route: ActivatedRoute, public dialog: MatDialog,
  public compareService: CompareService) { }

  async add() {

  if (this.isHomeTeam === true) {
    const addGameRequest: AddGameRequest = {
      homeId: this.tgid,
      awayId: this.selectedOpponent.tgid,
      week: this.selectedWeek
    };
    await this.dataService.addGame(addGameRequest);
  }
  else if (this.isHomeTeam === false) {
    const addGameRequest: AddGameRequest = {
      homeId: this.selectedOpponent.tgid,
      awayId: this.tgid,
      week: this.selectedWeek
    };
    await this.dataService.addGame(addGameRequest);
  }
  this.setData()
  this.setAddGameData();
}

  async delete (game: Game) {
  this.schedule = this.schedule.filter(g => g !== game);
  await this.dataService.deleteGame(this.school.tgid, game.week);
  this.setData();
  this.setAddGameData();
}

changeWeek(): void {
  this.dataService.getAvailableOpponents(this.tgid, this.selectedWeek).subscribe((data: School[]) => {
    console.log(data);
    this.availableOpponents = data;
  })
}

ngOnInit() {
  this.route.params.subscribe(params => {

    this.setData();
    this.setAddGameData();
  });
}

setData(): void {
  const tgid = parseInt(this.route.snapshot.paramMap.get('tgid')!, 10);
  this.dataService.getSchoolByTgid(tgid).subscribe((data: School) => {
    console.log(data);
    this.school = data;
  });
  this.loadSchoolSchedule(tgid);
}

loadSchoolSchedule(tgid: number): void {
  this.dataService.getSchoolSchedule(tgid).subscribe((data: Game[]) => {
    console.log(data);
    this.schedule = data;
    this.dataSource = new MatTableDataSource(this.schedule);
    this.dataSource.sort = this.sort;
  });
}

setAddGameData(): void {
  this.tgid = parseInt(this.route.snapshot.paramMap.get('tgid')!, 10);
  this.dataService.getEmptyWeeks(this.tgid).subscribe((data: number[]) => {
    console.log(data);
    this.availableWeeks = data;
  })
}

getSuggestedGame(): void {
  this.tgid = parseInt(this.route.snapshot.paramMap.get('tgid')!, 10);
  this.dataService.getSuggestedOpponent(this.tgid).subscribe((data: SuggestedGameResponse) => {
    console.log(data);
    this.suggestedGame = data;
    if (this.suggestedGame !== null) {
      this.selectedWeek = this.suggestedGame.week;
      this.changeWeek();

      this.selectedOpponent = this.suggestedGame.opponent;
      this.isHomeTeam = this.suggestedGame.homeGame;

    } else {
      this.snackBarService.openSnackBar("No suggested games found", "Dismiss");
    }
  });
}

openScheduleSwapDialog(): void {
  const dialogRef = this.dialog.open(SwapScheduleDialog);

  dialogRef.afterClosed().subscribe((result: number) => {
    if (result !== null) {
      this.dataService.swapSchedule(this.tgid, result).subscribe(data => {
        console.log(data);
        this.loadSchoolSchedule(this.tgid);
      });
    }
  });
}
}

@Component({
    selector: 'swap-schedule-dialog',
    templateUrl: 'swap-schedule-dialog.html',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatFormField,
        MatLabel,
        MatSelect,
        FormsModule,
        NgFor,
        MatOption,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        NgIf,
    ],
})
export class SwapScheduleDialog {
  constructor(public dataService: DataService) {
    this.dataService.getSchools().subscribe((data: School[]) => {
      this.schoolList = data;
    })
  }

  schoolList!: School[];
  school2!: School;
}
