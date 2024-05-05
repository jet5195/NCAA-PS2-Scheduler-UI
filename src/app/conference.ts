import { School } from "./school";

export interface Conference {
    name: string;
    divisions: string[];
    powerConf: boolean;
    // color: string;
    // altColor: string;
    logo: string;
    numOfConfGames: number;
    numOfSchools: number;
    confGamesStartWeek: number;
    fbs: boolean;
    conferenceID: number;
    schools: School[];
}
