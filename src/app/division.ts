import {School} from "./school";

export interface Division {
  divisionId: number;
  name: string;
  shortName: string;
  schools: School[];
}
