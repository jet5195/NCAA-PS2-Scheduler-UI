import { Pipe, PipeTransform } from '@angular/core';
import { CardOption, SchoolDataType } from '../start-flow/start-flow.component';

@Pipe({
  name: 'filterOptions',
})
export class FilterOptionsPipe implements PipeTransform {
  transform(
    options: CardOption[],
    selectedSchoolData: SchoolDataType,
  ): CardOption[] {
    return options.filter((option) => !option.condition || option.condition());
  }
}
