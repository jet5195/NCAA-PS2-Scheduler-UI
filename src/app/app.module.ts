import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';
import { AddGameComponent } from './add-game/add-game.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BowlsComponent } from './bowls/bowls.component';
import { AddSchoolDialogComponent } from './conference-editor/add-school-dialog/add-school-dialog.component';
import { ConferenceDivisionsComponent } from './conference-editor/conference-divisions/conference-divisions.component';
import { ConferenceEditorComponent } from './conference-editor/conference-editor.component';
import { ConferenceInfoComponent } from './conference-editor/conference-info/conference-info.component';
import { ConferenceSchoolListComponent } from './conference-editor/conference-school-list/conference-school-list.component';
import { SchoolGridTileComponent } from './conference-editor/conference-school-list/school-grid-tile/school-grid-tile.component';
import { MapComponent } from './conference-editor/map/map.component';
import { LiteSchoolGridTileComponent } from './conference-editor/xdiv-rivalries/school-grid-tile-dense/lite-school-grid-tile.component';
import { XdivRivalriesComponent } from './conference-editor/xdiv-rivalries/xdiv-rivalries.component';
import { ConferenceComponent } from './conference/conference.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditConferencesComponent } from './edit-conferences/edit-conferences.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { ConferenceLogoPipe } from './pipes/conferenceLogo';
import { ConferenceNamePipe } from './pipes/conferenceName';
import { DayOfWeekToStringPipe } from './pipes/dayOfWeekToString.pipe';
import { MinutesAfterMidnightToTimePipe } from './pipes/minutesAfterMidnightToTime.pipe';
import { PlayoffSchedulerComponent } from './playoff-scheduler/playoff-scheduler.component';
import { PlayoffComponent } from './playoff/playoff.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SchoolDetailComponent } from './school-detail/school-detail.component';
import {
  SchoolScheduleComponent,
  SwapScheduleDialog,
} from './school-schedule/school-schedule.component';
import { SchoolsComponent } from './schools/schools.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    SchoolsComponent,
    SchoolDetailComponent,
    SchoolScheduleComponent,
    AddGameComponent,
    DashboardComponent,
    EditConferencesComponent,
    ConferenceComponent,
    ScheduleComponent,
    EditGameComponent,
    MinutesAfterMidnightToTimePipe,
    DayOfWeekToStringPipe,
    ConferenceNamePipe,
    ConferenceLogoPipe,
    PlayoffComponent,
    PlayoffSchedulerComponent,
    BowlsComponent,
    SwapScheduleDialog,
    ConferenceEditorComponent,
    MapComponent,
    ConferenceSchoolListComponent,
    AddSchoolDialogComponent,
    ConferenceInfoComponent,
    ConferenceDivisionsComponent,
    XdivRivalriesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatSliderModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTooltipModule,
    DragDropModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatListModule,
    MatTabsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    ReactiveFormsModule,
    MatCheckbox,
    SchoolGridTileComponent,
    LiteSchoolGridTileComponent,
  ],
  providers: [
    MinutesAfterMidnightToTimePipe,
    DayOfWeekToStringPipe,
    ConferenceNamePipe,
    ConferenceLogoPipe,
    DataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
