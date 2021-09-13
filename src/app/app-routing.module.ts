import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolsComponent } from './schools/schools.component';
import { SchoolScheduleComponent } from './school-schedule/school-schedule.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditConferencesComponent } from './edit-conferences/edit-conferences.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'schools', component: SchoolsComponent },
  { path: 'school/:tgid/schedule', component: SchoolScheduleComponent},
  { path: 'edit-conferences', component: EditConferencesComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
