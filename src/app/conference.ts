import {School} from "./school";
import {Division} from "./division";

export interface Conference {
  conferenceID: number;
  name: string;
  shortName: string;
  abbreviation: string;
  classification: string;
  divisions: Division[];
  powerConf: boolean;
  // color: string;
  // altColor: string;
  logo: string;
  numOfConfGames: number;
  numOfSchools: number;
  confGamesStartWeek: number;
  schools: School[];
  fbs: boolean;
}
