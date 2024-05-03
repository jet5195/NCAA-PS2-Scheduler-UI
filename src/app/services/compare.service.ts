import { Injectable } from '@angular/core';
import { Conference } from '../conference';
import { School } from '../school';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  constructor() { }

  
  /**
   * Compares two conferences for equality.
   * @param c1 The first conference.
   * @param c2 The second conference.
   * @returns True if the conferences are equal, false otherwise.
   */
  compareConferences(c1: Conference, c2: Conference): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }

  compareSchools(school1: School, school2: School): boolean {
    return school1.tgid === school2.tgid;
  }


  compareDays(d1: any, d2: any): boolean {
    return d1.key === d2.key;
  }

  compareWeeks(w1: number, w2: number): boolean {
    return w1 === w2;
  }
}
