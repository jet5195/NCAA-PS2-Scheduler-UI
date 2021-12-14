import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeekToString'
})
export class DayOfWeekToStringPipe implements PipeTransform {

  transform(value: number | null, is5Sat: boolean): string {
    if (value) {
      if (!is5Sat){
        value-=3;
        if(value < 0){
          value = 7 - value;
        }
      }
        if(value === 0){
          return 'Monday';
        }
        if(value === 1){
          return 'Tuesday';
        }
        if(value === 2){
          return 'Wednesday';
        }
        if(value === 3){
          return 'Thursday';
        }
        if(value === 4){
          return 'Friday';
        }
        if(value === 5){
          return 'Saturday';
        }
        if(value === 6){
          return 'Sunday';
        }
      
    }
    return ''
  }
}
