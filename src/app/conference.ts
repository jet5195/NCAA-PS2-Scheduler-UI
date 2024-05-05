import {School} from "./school";
import {Division} from "./division";

export interface Conference {
  conferenceId: number;
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
  conferenceID: number;
  schools: School[];
  fbs: boolean;
}
