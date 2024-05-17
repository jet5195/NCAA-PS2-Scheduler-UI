import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BowlsComponent } from './bowls/bowls.component';
import { ConferenceEditorComponent } from './conference-editor/conference-editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditConferencesComponent } from './edit-conferences/edit-conferences.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { PlayoffSchedulerComponent } from './playoff-scheduler/playoff-scheduler.component';
import { PlayoffComponent } from './playoff/playoff.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SchoolScheduleComponent } from './school-schedule/school-schedule.component';
import { SchoolsComponent } from './schools/schools.component';
import { StartFlowComponent } from './start-flow/start-flow.component';
import { unsavedChangesGuard } from './unsaved-changes.guard';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartFlowComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'schools/:conf', component: SchoolsComponent },
  { path: 'school/:tgid/schedule', component: SchoolScheduleComponent },
  { path: 'conferences', component: EditConferencesComponent },
  { path: 'schedule/:week', component: ScheduleComponent },
  { path: 'game/:week/:gameNumber', component: EditGameComponent },
  { path: 'playoffs', component: PlayoffComponent },
  { path: 'playoffs/:teamCount', component: PlayoffSchedulerComponent },
  { path: 'bowls', component: BowlsComponent },
  {
    path: 'custom-conferences',
    component: ConferenceEditorComponent,
    canDeactivate: [unsavedChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
