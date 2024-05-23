import { enableProdMode, importProvidersFrom } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { ConferenceLogoPipe } from './app/pipes/conferenceLogo';
import { ConferenceNamePipe } from './app/pipes/conferenceName';
import { DayOfWeekToStringPipe } from './app/pipes/dayOfWeekToString.pipe';
import { MinutesAfterMidnightToTimePipe } from './app/pipes/minutesAfterMidnightToTime.pipe';
import { DataService } from './app/services/data.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
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
      MatCheckboxModule,
      MatStepperModule,
    ),
    MinutesAfterMidnightToTimePipe,
    DayOfWeekToStringPipe,
    ConferenceNamePipe,
    ConferenceLogoPipe,
    DataService,
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
