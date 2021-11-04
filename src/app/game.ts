import { School } from "./school";

export interface Game {
    gameResult: GameResult;
    awayTeam: School;
    homeTeam: School;
    time: number;
    day: number;
    conferenceGame: number;
    week: number;
    weight: number;
    userGame: number;
    gameNumber: number;
    rivalryGame: boolean;
    removableGame: boolean;
}

export interface GameResult {
    awayScore: number;
    homeScore: number;
    ot: number;
}