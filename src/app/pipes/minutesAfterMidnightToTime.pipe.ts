import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesAfterMidnightToTime'
})
export class MinutesAfterMidnightToTimePipe implements PipeTransform {

  transform(value: number | null): any {
    if (value) {
      var output: String = '';
      var hoursAfterMidnight: number;
      var minutes: number;
      var extention: String = '';

      hoursAfterMidnight = value / 60;
      minutes = value % 60;

      if(hoursAfterMidnight >= 12) {
        extention = 'PM';
      } else {
        extention = 'AM';
      }


      output = ~~hoursAfterMidnight + ':' + minutes + ' ' + extention;
    }
    else return null

  }
}
