import {Component, Input} from '@angular/core';
import {Conference} from "../../conference";

@Component({
  selector: 'app-conference-divisions',
  templateUrl: './conference-divisions.component.html',
  styleUrl: './conference-divisions.component.css'
})
export class ConferenceDivisionsComponent {
  @Input() conference: Conference;

}
