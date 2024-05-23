import {Pipe, PipeTransform} from '@angular/core';
import {Conference} from '../conference';

@Pipe({
    name: 'conferenceName',
    standalone: true
})
export class ConferenceNamePipe implements PipeTransform {

  transform(value: number | null, conferenceList: Conference[] | undefined): any {
    let conferenceName: string | undefined = value?.toString();
    if (value !== null && conferenceList != null) {
      conferenceList.forEach((conf: Conference) => {
        if (conf.conferenceId === value) {
          conferenceName = conf.shortName;
        }
      });
    }
    return conferenceName;
  }
}
