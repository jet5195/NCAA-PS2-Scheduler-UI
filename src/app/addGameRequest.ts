import { GameResult } from "./game";

export class AddGameRequest {
    awayId!: number;
    homeId!: number;
    week!: number;
    day?: number;
    time?: number;
    gameResult?: GameResult
}