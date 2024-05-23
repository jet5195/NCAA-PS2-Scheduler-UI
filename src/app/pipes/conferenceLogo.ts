import { Pipe, PipeTransform } from '@angular/core';
import { Conference } from '../conference';

@Pipe({
    name: 'conferenceLogo',
    standalone: true
})
export class ConferenceLogoPipe implements PipeTransform {

  transform(value: number | null, conferenceList: Conference[] | undefined): any {
    let conferenceLogo: string | undefined = value?.toString();
    if (value !== null && conferenceList != null) {
      conferenceList.forEach((conf: Conference) => {
        if(conf.conferenceId === value){
          conferenceLogo = conf.logo;
        }
      });
    }
    return conferenceLogo;
  }
}
