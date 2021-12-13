import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesAfterMidnightToTime'
})
export class MinutesAfterMidnightToTimePipe implements PipeTransform {

  transform(value: number | null, isMilitaryTime: boolean): any {
    if (value) {
      var output: String = '';
      var hoursAfterMidnight: number;
      var minutes: number;

      hoursAfterMidnight = value / 60;
      minutes = value % 60;

      if (!isMilitaryTime) {
        var end = 'AM';
        if (hoursAfterMidnight >= 12) {
          end = 'PM'
          if (hoursAfterMidnight >= 13) {
            hoursAfterMidnight -= 12;
          }
        }
        output = hoursAfterMidnight < 10 ? '0' + ~~hoursAfterMidnight : '' + ~~hoursAfterMidnight;
        output += ':' + (minutes < 10 ? '0' + minutes : minutes);
        output += ' ' + end;
      } else {

        output = hoursAfterMidnight < 10 ? '0' + ~~hoursAfterMidnight : '' + ~~hoursAfterMidnight;
        output += ':' + (minutes < 10 ? '0' + minutes : minutes);
      }



      return output;
    }
    else return null

  }
}
