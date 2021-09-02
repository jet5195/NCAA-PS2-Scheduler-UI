import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolsComponent } from './schools/schools.component';
import { SchoolScheduleComponent } from './school-schedule/school-schedule.component';


const routes: Routes = [
  { path: 'schools', component: SchoolsComponent },
  { path: 'school/:tgid/schedule', component: SchoolScheduleComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
