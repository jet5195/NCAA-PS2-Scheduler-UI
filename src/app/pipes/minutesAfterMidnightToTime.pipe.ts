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

      hoursAfterMidnight = value / 60;
      minutes = value % 60;

      output = hoursAfterMidnight < 10 ? '0' + ~~hoursAfterMidnight: '' + ~~hoursAfterMidnight;
      output += ':' + (minutes < 10 ? '0' + minutes : minutes);
      //output += value >= 720 ? 'PM' : 'AM';
      return output;
    }
    else return null

  }
}
