import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-start-flow-export',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>start-flow-export works!</p>`,
  styleUrl: './start-flow-export.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartFlowExportComponent { }
