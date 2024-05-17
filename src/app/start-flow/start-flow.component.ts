import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-start-flow',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './start-flow.component.html',
  styleUrl: './start-flow.component.css',
})
export class StartFlowComponent {
  isLinear = true;
  selectedMode: string = '';
  selectedAlignment: string = '';

  selectMode(mode: string) {
    this.selectedMode = mode;
  }

  selectAlignment(alignment: string) {
    this.selectedAlignment = alignment;
  }

  constructor() {}
}
