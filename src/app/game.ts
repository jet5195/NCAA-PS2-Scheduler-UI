import { School } from "./school";

export interface Game {
    homeTeam: School;
    awayTeam: School;
    time: number;
    day: number;
    conferenceGame: number;
    week: number;
    userGame: number;
    gameNumber: number;
    rivalryGame: boolean;
    removableGame: boolean;
}